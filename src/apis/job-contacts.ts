import {
  JobPostingContactCompleteType,
  JobPostingContactType,
} from "@/types/chat/job-posting/job-posting-contact-type";

import { apiFetch } from "./fetch";

export const postJobPostingContact = async (
  id: string,
  type: JobPostingContactType,
) => {
  try {
    const body: { resumeId?: string; jobPostingId?: string } = {};

    if (type === "resume") {
      body.resumeId = id;
    }

    if (type === "jobPosting") {
      body.jobPostingId = id;
    }

    return await apiFetch("/api/v1/job-posting-contacts", "POST", body);
  } catch (e) {
    console.error("[postJobPostingContact] failed", e);
    return { error: e || "Failed to post job posting contact" };
  }
};

export const postJobPostingContactComplete = async ({
  jobContactId,
  channelId,
  type,
}: {
  jobContactId: string;
  channelId: string;
  type: JobPostingContactCompleteType;
}) => {
  try {
    const body: {
      firestoreJobPostingChatChannelId?: string;
      firestorePartTimeJobChatChannelId?: string;
    } = {};

    if (type === "jobPosting") {
      body.firestoreJobPostingChatChannelId = channelId;
    }

    if (type === "partTimeJob") {
      body.firestorePartTimeJobChatChannelId = channelId;
    }

    return await apiFetch(
      `/api/v1/job-contacts/${jobContactId}/completion`,
      "POST",
      body,
    );
  } catch (e) {
    console.error("[postJobPostingContactComplete] failed", e);
    return { error: e || "Failed to post job posting contact complete" };
  }
};
