import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";

export class JobsService {
  /**
   * Create a job posting
   */
  async createJobPosting(organizationId: string, data: {
    title: string;
    description: string;
    department?: string;
    location?: string;
    employmentType?: string;
    salaryMin?: number;
    salaryMax?: number;
    currency?: string;
  }) {
    const posting = await prisma.jobPosting.create({
      data: {
        organizationId,
        title: data.title,
        description: data.description,
        department: data.department,
        location: data.location,
        employmentType: data.employmentType || "full_time",
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        currency: data.currency || "USD",
        status: "draft"
      }
    });

    logger.info(`Job posting created: ${posting.id} org=${organizationId}`);
    return posting;
  }

  /**
   * Publish a job posting
   */
  async publishJobPosting(organizationId: string, jobId: string) {
    const posting = await prisma.jobPosting.findFirst({
      where: { id: jobId, organizationId }
    });

    if (!posting) {
      throw new Error("Job posting not found");
    }

    const updated = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        status: "published",
        publishedAt: new Date()
      }
    });

    logger.info(`Job posting published: ${jobId}`);
    return updated;
  }

  /**
   * Close a job posting
   */
  async closeJobPosting(organizationId: string, jobId: string) {
    const posting = await prisma.jobPosting.findFirst({
      where: { id: jobId, organizationId }
    });

    if (!posting) {
      throw new Error("Job posting not found");
    }

    const updated = await prisma.jobPosting.update({
      where: { id: jobId },
      data: {
        status: "closed",
        closedAt: new Date()
      }
    });

    logger.info(`Job posting closed: ${jobId}`);
    return updated;
  }

  /**
   * Submit an application
   */
  async submitApplication(organizationId: string, jobId: string, data: {
    applicantEmail: string;
    applicantName: string;
    resumeUrl?: string;
    coverLetter?: string;
  }) {
    const posting = await prisma.jobPosting.findFirst({
      where: { id: jobId, organizationId }
    });

    if (!posting) {
      throw new Error("Job posting not found");
    }

    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        applicantEmail: data.applicantEmail,
        applicantName: data.applicantName,
        resumeUrl: data.resumeUrl,
        coverLetter: data.coverLetter,
        status: "new"
      }
    });

    logger.info(`Application submitted: ${application.id} job=${jobId}`);
    return application;
  }

  /**
   * Update application status
   */
  async updateApplicationStatus(organizationId: string, applicationId: string, status: string, notes?: string) {
    const application = await prisma.jobApplication.findFirst({
      where: { id: applicationId }
    });

    if (!application) {
      throw new Error("Application not found");
    }

    // Verify job belongs to org
    const job = await prisma.jobPosting.findFirst({
      where: { id: application.jobId, organizationId }
    });

    if (!job) {
      throw new Error("Unauthorized");
    }

    const updated = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: {
        status,
        notes
      }
    });

    logger.info(`Application updated: ${applicationId} status=${status}`);
    return updated;
  }

  /**
   * Rate an application
   */
  async rateApplication(organizationId: string, applicationId: string, rating: number) {
    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    const application = await prisma.jobApplication.findFirst({
      where: { id: applicationId }
    });

    if (!application) {
      throw new Error("Application not found");
    }

    // Verify job belongs to org
    const job = await prisma.jobPosting.findFirst({
      where: { id: application.jobId, organizationId }
    });

    if (!job) {
      throw new Error("Unauthorized");
    }

    const updated = await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { rating }
    });

    return updated;
  }

  /**
   * Get job posting with applications
   */
  async getJobPosting(organizationId: string, jobId: string) {
    const posting = await prisma.jobPosting.findFirst({
      where: { id: jobId, organizationId },
      include: {
        applications: { orderBy: { appliedAt: "desc" } }
      }
    });

    if (!posting) {
      throw new Error("Job posting not found");
    }

    return posting;
  }

  /**
   * List job postings
   */
  async listJobPostings(organizationId: string, status?: string) {
    const postings = await prisma.jobPosting.findMany({
      where: {
        organizationId,
        ...(status && { status })
      },
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { publishedAt: "desc" }
    });

    return postings;
  }

  /**
   * Get recruitment pipeline stats
   */
  async getRecruitmentStats(organizationId: string) {
    // Get all job postings
    const jobs = await prisma.jobPosting.findMany({
      where: { organizationId }
    });

    // Get all applications grouped by status
    const applications = await prisma.jobApplication.groupBy({
      by: ["status"],
      where: {
        job: { organizationId }
      },
      _count: true
    });

    const stats = {
      totalOpenings: jobs.filter(j => j.status === "published").length,
      totalApplications: applications.reduce((sum: number, a: any) => sum + a._count, 0),
      new: applications.find(a => a.status === "new")?._count || 0,
      reviewing: applications.find(a => a.status === "reviewing")?._count || 0,
      shortlisted: applications.find(a => a.status === "shortlisted")?._count || 0,
      hired: applications.find(a => a.status === "hired")?._count || 0,
      rejected: applications.find(a => a.status === "rejected")?._count || 0
    };

    return stats;
  }
}
