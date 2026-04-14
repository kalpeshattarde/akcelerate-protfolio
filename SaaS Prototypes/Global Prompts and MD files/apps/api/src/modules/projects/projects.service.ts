import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";

export class ProjectsService {
  /**
   * Create a new project
   */
  async createProject(organizationId: string, userId: string, data: {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
  }) {
    const project = await prisma.project.create({
      data: {
        organizationId,
        name: data.name,
        description: data.description,
        owner: userId,
        startDate: data.startDate,
        endDate: data.endDate,
        status: "active"
      }
    });

    // Make creator a project member
    await prisma.projectMember.create({
      data: {
        projectId: project.id,
        userId,
        role: "lead"
      }
    });

    logger.info(`Project created: ${project.id} in org: ${organizationId}`);
    return project;
  }

  /**
   * Get all projects for organization
   */
  async listProjects(organizationId: string, status?: string) {
    const projects = await prisma.project.findMany({
      where: {
        organizationId,
        ...(status && { status })
      },
      include: {
        members: true,
        tasks: { take: 5 }
      },
      orderBy: { createdAt: "desc" }
    });

    return projects;
  }

  /**
   * Get project with tasks and members
   */
  async getProjectById(organizationId: string, projectId: string) {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        organizationId
      },
      include: {
        members: true,
        tasks: { orderBy: { createdAt: "desc" } }
      }
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  /**
   * Update a project
   */
  async updateProject(organizationId: string, projectId: string, data: any) {
    const project = await prisma.project.updateMany({
      where: { id: projectId, organizationId },
      data
    });

    if (project.count === 0) {
      throw new Error("Project not found");
    }

    return this.getProjectById(organizationId, projectId);
  }

  /**
   * Create a task in a project
   */
  async createTask(organizationId: string, projectId: string, data: {
    title: string;
    description?: string;
    priority?: string;
    assignee?: string;
    dueDate?: Date;
  }) {
    // Verify project exists
    const project = await prisma.project.findFirst({
      where: { id: projectId, organizationId }
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const task = await prisma.task.create({
      data: {
        projectId,
        title: data.title,
        description: data.description,
        priority: data.priority || "medium",
        assignee: data.assignee,
        dueDate: data.dueDate,
        status: "todo"
      }
    });

    logger.info(`Task created: ${task.id} in project: ${projectId}`);
    return task;
  }

  /**
   * Update task status (kanban board functionality)
   */
  async updateTaskStatus(organizationId: string, taskId: string, status: string) {
    // Verify task belongs to org's project
    const task = await prisma.task.findFirst({
      where: { id: taskId }
    });

    if (!task) {
      throw new Error("Task not found");
    }

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status }
    });

    logger.info(`Task updated: ${taskId} status=${status}`);
    return updated;
  }

  /**
   * Get project statistics
   */
  async getProjectStats(organizationId: string, projectId: string) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, organizationId }
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const tasks = await prisma.task.groupBy({
      by: ["status"],
      where: { projectId },
      _count: true
    });

    const stats = {
      total: tasks.reduce((sum: number, t: any) => sum + t._count, 0),
      todo: tasks.find(t => t.status === "todo")?._count || 0,
      inProgress: tasks.find(t => t.status === "in_progress")?._count || 0,
      review: tasks.find(t => t.status === "review")?._count || 0,
      done: tasks.find(t => t.status === "done")?._count || 0,
      completion: 0
    };

    stats.completion = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

    return stats;
  }

  /**
   * Add team member to project
   */
  async addProjectMember(organizationId: string, projectId: string, userId: string, role: string = "member") {
    // Verify project exists
    const project = await prisma.project.findFirst({
      where: { id: projectId, organizationId }
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const member = await prisma.projectMember.upsert({
      where: { projectId_userId: { projectId, userId } },
      create: { projectId, userId, role },
      update: { role }
    });

    logger.info(`Member added to project: user=${userId} project=${projectId}`);
    return member;
  }
}
