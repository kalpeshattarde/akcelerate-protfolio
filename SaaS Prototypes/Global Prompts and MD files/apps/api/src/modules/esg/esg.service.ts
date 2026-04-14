import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";

export class EsgService {
  /**
   * Create or get ESG report for a period
   */
  async getOrCreateReport(organizationId: string, reportPeriod: string) {
    let report = await prisma.esgReport.findFirst({
      where: {
        organizationId,
        reportPeriod
      }
    });

    if (!report) {
      report = await prisma.esgReport.create({
        data: {
          organizationId,
          reportPeriod,
          status: "draft"
        }
      });

      logger.info(`ESG report created: ${report.id} period=${reportPeriod}`);
    }

    return report;
  }

  /**
   * Add or update ESG metric
   */
  async submitMetric(organizationId: string, reportId: string, data: {
    category: "environmental" | "social" | "governance";
    metric: string;
    value: number;
    unit: string;
    targetValue?: number;
  }) {
    const report = await prisma.esgReport.findFirst({
      where: { id: reportId, organizationId }
    });

    if (!report) {
      throw new Error("Report not found");
    }

    const esgMetric = await prisma.esgMetric.upsert({
      where: {
        // Using composite key simulation
        reportId_category_metric: { reportId, category: data.category, metricName: data.metric }
      },
      create: {
        reportId,
        category: data.category,
        metric: data.metric,
        value: data.value,
        unit: data.unit,
        targetValue: data.targetValue
      },
      update: {
        value: data.value,
        unit: data.unit,
        targetValue: data.targetValue
      }
    });

    logger.info(`Metric added: ${esgMetric.id} category=${data.category}`);
    return esgMetric;
  }

  /**
   * Get full ESG report with all metrics
   */
  async getReport(organizationId: string, reportId: string) {
    const report = await prisma.esgReport.findFirst({
      where: { id: reportId, organizationId },
      include: {
        metrics: true
      }
    });

    if (!report) {
      throw new Error("Report not found");
    }

    return report;
  }

  /**
   * List reports for organization
   */
  async listReports(organizationId: string, status?: string) {
    const reports = await prisma.esgReport.findMany({
      where: {
        organizationId,
        ...(status && { status })
      },
      include: {
        _count: {
          select: { metrics: true }
        }
      },
      orderBy: { reportPeriod: "desc" }
    });

    return reports;
  }

  /**
   * Submit report for approval
   */
  async submitReport(organizationId: string, reportId: string) {
    const report = await prisma.esgReport.findFirst({
      where: { id: reportId, organizationId }
    });

    if (!report) {
      throw new Error("Report not found");
    }

    // Check that report has metrics
    const metrics = await prisma.esgMetric.count({
      where: { reportId }
    });

    if (metrics === 0) {
      throw new Error("Cannot submit report without metrics");
    }

    const updated = await prisma.esgReport.update({
      where: { id: reportId },
      data: { status: "submitted" }
    });

    logger.info(`Report submitted: ${reportId}`);
    return updated;
  }

  /**
   * Approve report
   */
  async approveReport(organizationId: string, reportId: string) {
    const report = await prisma.esgReport.findFirst({
      where: { id: reportId, organizationId }
    });

    if (!report) {
      throw new Error("Report not found");
    }

    const updated = await prisma.esgReport.update({
      where: { id: reportId },
      data: {
        status: "approved",
        approvedAt: new Date()
      }
    });

    logger.info(`Report approved: ${reportId}`);
    return updated;
  }

  /**
   * Get ESG dashboard summary
   */
  async getDashboard(organizationId: string) {
    // Get latest reports by period
    const reports = await prisma.esgReport.findMany({
      where: { organizationId },
      orderBy: { reportPeriod: "desc" },
      take: 4,
      include: { metrics: true }
    });

    // Calculate environmental impact
    const latestReport = reports[0];
    const envMetrics = latestReport?.metrics.filter(m => m.category === "environmental") || [];
    const socialMetrics = latestReport?.metrics.filter(m => m.category === "social") || [];
    const govMetrics = latestReport?.metrics.filter(m => m.category === "governance") || [];

    // Calculate goal achievement
    const metricsWithTargets = latestReport?.metrics.filter(m => m.targetValue) || [];
    const achievedTargets = metricsWithTargets.filter(m => m.value >= (m.targetValue || 0)).length;
    const goalAchievementRate =
      metricsWithTargets.length > 0 ? Math.round((achievedTargets / metricsWithTargets.length) * 100) : 0;

    return {
      totalReports: await prisma.esgReport.count({ where: { organizationId } }),
      approvedReports: await prisma.esgReport.count({
        where: { organizationId, status: "approved" }
      }),
      latestPeriod: latestReport?.reportPeriod,
      environmentalMetrics: envMetrics.length,
      socialMetrics: socialMetrics.length,
      governanceMetrics: govMetrics.length,
      goalAchievementRate,
      reports: reports.map(r => ({
        period: r.reportPeriod,
        status: r.status,
        metricCount: r.metrics.length
      }))
    };
  }

  /**
   * Generate ESG compliance report
   */
  async generateComplianceReport(organizationId: string, reportId: string) {
    const report = await prisma.esgReport.findFirst({
      where: { id: reportId, organizationId },
      include: { metrics: true }
    });

    if (!report) {
      throw new Error("Report not found");
    }

    // Group metrics by category
    const categories = {
      environmental: report.metrics.filter(m => m.category === "environmental"),
      social: report.metrics.filter(m => m.category === "social"),
      governance: report.metrics.filter(m => m.category === "governance")
    };

    // Calculate compliance score (0-100)
    const targetMetrics = report.metrics.filter(m => m.targetValue);
    const metOnTarget = targetMetrics.filter(m => m.value >= (m.targetValue || 0)).length;
    const complianceScore =
      targetMetrics.length > 0 ? Math.round((metOnTarget / targetMetrics.length) * 100) : 50;

    return {
      reportId,
      period: report.reportPeriod,
      generatedAt: new Date(),
      complianceScore,
      categories,
      riskFlags: report.metrics
        .filter(m => m.targetValue && m.value < m.targetValue * 0.8)
        .map(m => ({ metric: m.metric, current: m.value, target: m.targetValue }))
    };
  }
}
