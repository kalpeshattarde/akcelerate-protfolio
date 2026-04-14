import { prisma } from "../../lib/prisma.js";
import { logger } from "../../lib/logger.js";
import crypto from "crypto";

export class VideoMeetingsService {
  /**
   * Create and schedule a meeting
   */
  async createMeeting(organizationId: string, hostId: string, data: {
    title: string;
    description?: string;
    scheduledAt?: Date;
    maxParticipants?: number;
  }) {
    const roomId = `room-${crypto.randomUUID().substring(0, 8)}`;

    const meeting = await prisma.videoMeeting.create({
      data: {
        organizationId,
        roomId,
        title: data.title,
        description: data.description,
        hostId,
        scheduledAt: data.scheduledAt,
        maxParticipants: data.maxParticipants || 100,
        status: "scheduled"
      }
    });

    // Add host as participant
    await prisma.meetingParticipant.create({
      data: {
        meetingId: meeting.id,
        userId: hostId
      }
    });

    logger.info(`Meeting created: ${meeting.id} host=${hostId}`);
    return meeting;
  }

  /**
   * Start a meeting
   */
  async startMeeting(organizationId: string, meetingId: string) {
    const meeting = await prisma.videoMeeting.findFirst({
      where: { id: meetingId, organizationId }
    });

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    const updated = await prisma.videoMeeting.update({
      where: { id: meetingId },
      data: {
        status: "live",
        startedAt: new Date()
      }
    });

    logger.info(`Meeting started: ${meetingId}`);
    return updated;
  }

  /**
   * End a meeting
   */
  async endMeeting(organizationId: string, meetingId: string) {
    const meeting = await prisma.videoMeeting.findFirst({
      where: { id: meetingId, organizationId }
    });

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    const updated = await prisma.videoMeeting.update({
      where: { id: meetingId },
      data: {
        status: "ended",
        endedAt: new Date()
      }
    });

    logger.info(`Meeting ended: ${meetingId}`);
    return updated;
  }

  /**
   * Add participant to meeting
   */
  async addParticipant(organizationId: string, meetingId: string, userId: string) {
    const meeting = await prisma.videoMeeting.findFirst({
      where: { id: meetingId, organizationId }
    });

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    const participant = await prisma.meetingParticipant.upsert({
      where: { meetingId_userId: { meetingId, userId } },
      create: { meetingId, userId },
      update: { joinedAt: new Date() }
    });

    logger.info(`Participant joined: ${userId} meeting=${meetingId}`);
    return participant;
  }

  /**
   * Remove participant (mark as left)
   */
  async removeParticipant(organizationId: string, meetingId: string, userId: string) {
    const participant = await prisma.meetingParticipant.findFirst({
      where: { meetingId, userId }
    });

    if (!participant) {
      throw new Error("Participant not found");
    }

    const now = new Date();
    const duration = participant.joinedAt
      ? Math.floor((now.getTime() - participant.joinedAt.getTime()) / 1000)
      : 0;

    const updated = await prisma.meetingParticipant.update({
      where: { id: participant.id },
      data: {
        leftAt: now,
        duration
      }
    });

    logger.info(`Participant left: ${userId} meeting=${meetingId} duration=${duration}s`);
    return updated;
  }

  /**
   * Get meeting details
   */
  async getMeeting(organizationId: string, meetingId: string) {
    const meeting = await prisma.videoMeeting.findFirst({
      where: { id: meetingId, organizationId },
      include: {
        participants: true
      }
    });

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    return meeting;
  }

  /**
   * List meetings for organization
   */
  async listMeetings(organizationId: string, status?: string) {
    const meetings = await prisma.videoMeeting.findMany({
      where: {
        organizationId,
        ...(status && { status })
      },
      include: {
        _count: {
          select: { participants: true }
        }
      },
      orderBy: { scheduledAt: "desc" }
    });

    return meetings;
  }

  /**
   * Get meeting analytics
   */
  async getMeetingAnalytics(organizationId: string, meetingId: string) {
    const meeting = await prisma.videoMeeting.findFirst({
      where: { id: meetingId, organizationId },
      include: { participants: true }
    });

    if (!meeting) {
      throw new Error("Meeting not found");
    }

    const participants = meeting.participants;
    const completedParticipants = participants.filter(p => p.leftAt);
    const activeParticipants = participants.filter(p => !p.leftAt);

    const totalDuration = meeting.endedAt && meeting.startedAt
      ? Math.floor((meeting.endedAt.getTime() - meeting.startedAt.getTime()) / 1000)
      : 0;

    const totalParticipantMinutes = completedParticipants.reduce((sum: number, p: any) => {
      return sum + (p.duration || 0);
    }, 0);

    return {
      meetingId,
      status: meeting.status,
      totalDuration: `${Math.floor(totalDuration / 60)}m`,
      totalParticipants: participants.length,
      activeParticipants: activeParticipants.length,
      completedParticipants: completedParticipants.length,
      totalParticipantMinutes: Math.floor(totalParticipantMinutes / 60)
    };
  }
}
