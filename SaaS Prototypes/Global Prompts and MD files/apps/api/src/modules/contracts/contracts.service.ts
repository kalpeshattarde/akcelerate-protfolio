import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";
import crypto from "crypto";

export class ContractsService {
  /**
   * Create a new contract
   */
  async createContract(organizationId: string, data: {
    title: string;
    description?: string;
    counterparty: string;
    value?: number;
    currency?: string;
    expiresAt?: Date;
  }) {
    const contract = await prisma.contract.create({
      data: {
        organizationId,
        title: data.title,
        description: data.description,
        counterparty: data.counterparty,
        value: data.value,
        currency: data.currency || "USD",
        expiresAt: data.expiresAt,
        status: "draft",
        signatureStatus: "unsigned"
      }
    });

    logger.info(`Contract created: ${contract.id} org=${organizationId}`);
    return contract;
  }

  /**
   * Upload contract version
   */
  async uploadVersion(organizationId: string, contractId: string, createdBy: string, pdfUrl?: string) {
    const contract = await prisma.contract.findFirst({
      where: { id: contractId, organizationId }
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    // Calculate hash for content change detection
    const hash = crypto.randomUUID(); // In real app: hash of PDF content

    // Get latest version number
    const latest = await prisma.contractVersion.findFirst({
      where: { contractId },
      orderBy: { versionNumber: "desc" }
    });

    const versionNumber = (latest?.versionNumber || 0) + 1;

    const version = await prisma.contractVersion.create({
      data: {
        contractId,
        versionNumber,
        pdfUrl,
        hash,
        createdBy
      }
    });

    logger.info(`Contract version uploaded: ${version.id} v${versionNumber}`);
    return version;
  }

  /**
   * Request signature from signer
   */
  async requestSignature(organizationId: string, contractId: string, signer: string) {
    const contract = await prisma.contract.findFirst({
      where: { id: contractId, organizationId }
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    const signature = await prisma.esignature.upsert({
      where: { contractId_signer: { contractId, signer } },
      create: {
        contractId,
        signer,
        status: "pending"
      },
      update: { status: "pending" }
    });

    logger.info(`Signature requested: ${signer} contract=${contractId}`);
    return signature;
  }

  /**
   * Sign contract
   */
  async signContract(organizationId: string, contractId: string, signer: string, signatureUrl: string) {
    const contract = await prisma.contract.findFirst({
      where: { id: contractId, organizationId }
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    const signature = await prisma.esignature.update({
      where: { contractId_signer: { contractId, signer } },
      data: {
        status: "signed",
        signedAt: new Date(),
        signatureUrl
      }
    });

    // Check if all required signatures are complete
    const allSignatures = await prisma.esignature.findMany({
      where: { contractId }
    });

    const allSigned = allSignatures.every(s => s.status === "signed");
    if (allSigned && allSignatures.length > 0) {
      await prisma.contract.update({
        where: { id: contractId },
        data: {
          status: "signed",
          signatureStatus: "fully_signed",
          signedAt: new Date()
        }
      });
    } else if (allSignatures.some(s => s.status === "signed")) {
      await prisma.contract.update({
        where: { id: contractId },
        data: { signatureStatus: "partially_signed" }
      });
    }

    logger.info(`Contract signed: ${signer} contract=${contractId}`);
    return signature;
  }

  /**
   * Get contract with versions and signatures
   */
  async getContract(organizationId: string, contractId: string) {
    const contract = await prisma.contract.findFirst({
      where: { id: contractId, organizationId },
      include: {
        versions: { orderBy: { versionNumber: "desc" } },
        esignatures: true
      }
    });

    if (!contract) {
      throw new Error("Contract not found");
    }

    return contract;
  }

  /**
   * List contracts for organization
   */
  async listContracts(organizationId: string, status?: string) {
    const contracts = await prisma.contract.findMany({
      where: {
        organizationId,
        ...(status && { status })
      },
      include: {
        _count: {
          select: { versions: true, esignatures: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return contracts;
  }

  /**
   * Get contract statistics
   */
  async getContractStats(organizationId: string) {
    const contracts = await prisma.contract.groupBy({
      by: ["status"],
      where: { organizationId },
      _count: true
    });

    const stats = {
      total: contracts.reduce((sum: number, c: any) => sum + c._count, 0),
      draft: contracts.find(c => c.status === "draft")?._count || 0,
      pendingReview: contracts.find(c => c.status === "pending_review")?._count || 0,
      signed: contracts.find(c => c.status === "signed")?._count || 0,
      archived: contracts.find(c => c.status === "archived")?._count || 0
    };

    return stats;
  }
}
