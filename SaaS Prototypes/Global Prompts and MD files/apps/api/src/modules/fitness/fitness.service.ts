import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";

export class FitnessService {
  /**
   * Log a workout session
   */
  async logWorkout(organizationId: string, userId: string, data: {
    workoutType: string;
    duration: number;
    caloriesBurned?: number;
    distance?: number;
    notes?: string;
    sessionDate?: Date;
  }) {
    const session = await prisma.workoutSession.create({
      data: {
        organizationId,
        userId,
        workoutType: data.workoutType,
        duration: data.duration,
        caloriesBurned: data.caloriesBurned,
        distance: data.distance,
        notes: data.notes,
        sessionDate: data.sessionDate || new Date()
      }
    });

    logger.info(`Workout logged: ${session.id} user=${userId} type=${data.workoutType}`);
    return session;
  }

  /**
   * Get workout history for user
   */
  async getWorkoutHistory(organizationId: string, userId: string, days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const sessions = await prisma.workoutSession.findMany({
      where: {
        organizationId,
        userId,
        sessionDate: { gte: since }
      },
      orderBy: { sessionDate: "desc" }
    });

    return sessions;
  }

  /**
   * Get fitness statistics
   */
  async getFitnessStats(organizationId: string, userId: string, days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const sessions = await prisma.workoutSession.findMany({
      where: {
        organizationId,
        userId,
        sessionDate: { gte: since }
      }
    });

    const workoutsByType = sessions.reduce((acc: any, session: any) => {
      acc[session.workoutType] = (acc[session.workoutType] || 0) + 1;
      return acc;
    }, {});

    const stats = {
      totalWorkouts: sessions.length,
      totalMinutes: sessions.reduce((sum: number, s: any) => sum + s.duration, 0),
      totalCalories: sessions.reduce((sum: number, s: any) => sum + (s.caloriesBurned || 0), 0),
      totalDistance: sessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0),
      avgDuration: sessions.length > 0 ? Math.round(sessions.reduce((sum: number, s: any) => sum + s.duration, 0) / sessions.length) : 0,
      workoutsByType,
      period: `Last ${days} days`
    };

    return stats;
  }

  /**
   * Create a fitness milestone
   */
  async createMilestone(organizationId: string, userId: string, data: {
    milestone: string;
    targetValue: number;
    unit: string;
    dueDate?: Date;
  }) {
    const goal = await prisma.fitnessMilestone.create({
      data: {
        organizationId,
        userId,
        milestone: data.milestone,
        targetValue: data.targetValue,
        unit: data.unit,
        dueDate: data.dueDate
      }
    });

    logger.info(`Milestone created: ${goal.id} user=${userId} milestone=${data.milestone}`);
    return goal;
  }

  /**
   * Update milestone progress
   */
  async updateMilestoneProgress(organizationId: string, milestoneId: string, currentValue: number) {
    const milestone = await prisma.fitnessMilestone.findFirst({
      where: { id: milestoneId, organizationId }
    });

    if (!milestone) {
      throw new Error("Milestone not found");
    }

    const completed = currentValue >= milestone.targetValue;

    const updated = await prisma.fitnessMilestone.update({
      where: { id: milestoneId },
      data: {
        currentValue,
        ...(completed && { completedAt: new Date() })
      }
    });

    logger.info(`Milestone updated: ${milestoneId} progress=${currentValue}/${milestone.targetValue}`);
    return updated;
  }

  /**
   * Get user's milestones
   */
  async getMilestones(organizationId: string, userId: string) {
    const milestones = await prisma.fitnessMilestone.findMany({
      where: {
        organizationId,
        userId
      },
      orderBy: { dueDate: "asc" }
    });

    return milestones.map(m => ({
      ...m,
      progress: m.currentValue ? Math.round((m.currentValue / m.targetValue) * 100) : 0,
      isCompleted: m.completedAt !== null
    }));
  }

  /**
   * Get fitness dashboard
   */
  async getDashboard(organizationId: string, userId: string) {
    const stats = await this.getFitnessStats(organizationId, userId, 7);
    const milestones = await this.getMilestones(organizationId, userId);
    const recentWorkouts = await this.getWorkoutHistory(organizationId, userId, 7);

    const activeMilestones = milestones.filter(m => !m.isCompleted);
    const completedMilestones = milestones.filter(m => m.isCompleted);

    return {
      thisWeek: {
        workouts: stats.totalWorkouts,
        minutes: stats.totalMinutes,
        calories: Math.round(stats.totalCalories)
      },
      goals: {
        active: activeMilestones.length,
        completed: completedMilestones.length,
        nextDue: activeMilestones.sort((a: any, b: any) => {
          const aDate = a.dueDate?.getTime() || Infinity;
          const bDate = b.dueDate?.getTime() || Infinity;
          return aDate - bDate;
        })[0]
      },
      recentWorkouts: recentWorkouts.slice(0, 5).map(w => ({
        type: w.workoutType,
        duration: w.duration,
        date: w.sessionDate
      }))
    };
  }

  /**
   * Get user's progress over time (for charts)
   */
  async getProgressChart(organizationId: string, userId: string, metric: "calories" | "duration" | "distance", days: number = 30) {
    const since = new Date();
    since.setDate(since.getDate() - days);

    const sessions = await prisma.workoutSession.findMany({
      where: {
        organizationId,
        userId,
        sessionDate: { gte: since }
      },
      orderBy: { sessionDate: "asc" }
    });

    // Group by day
    const groupedByDay: { [key: string]: any[] } = {};
    sessions.forEach(session => {
      const day = session.sessionDate.toISOString().split("T")[0];
      if (!groupedByDay[day]) {
        groupedByDay[day] = [];
      }
      groupedByDay[day].push(session);
    });

    // Calculate daily totals
    const chartData = Object.entries(groupedByDay).map(([day, daySessions]) => {
      let value = 0;
      if (metric === "calories") {
        value = daySessions.reduce((sum: number, s: any) => sum + (s.caloriesBurned || 0), 0);
      } else if (metric === "duration") {
        value = daySessions.reduce((sum: number, s: any) => sum + s.duration, 0);
      } else if (metric === "distance") {
        value = daySessions.reduce((sum: number, s: any) => sum + (s.distance || 0), 0);
      }
      return { date: day, value };
    });

    return chartData;
  }
}
