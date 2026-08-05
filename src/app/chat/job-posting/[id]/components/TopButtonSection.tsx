import ArrangeInterviewButton from "./buttons/ArrangeInterviewButton";
import HowToUseButton from "./buttons/HowToUseButton";
import LeaveButton from "./buttons/LeaveButton";
import SendResumeButton from "./buttons/SendResumeButton";
import { UserJobPostingChatChannelType } from "@/types/chat/job-posting/user-job-posting-chat-channel-type";
import ViewJobPostingButton from "./buttons/ViewJobPostingButton";
import ViewResumeButton from "./buttons/ViewResumeButton";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${pxToVw(20)};
  padding-bottom: ${pxToVw(2)};
`;

const TopButtonSection = ({
  userChannel,
  userId,
}: {
  userChannel: UserJobPostingChatChannelType | null;
  userId: string | null;
}) => {
  const source = useSearchParams().get("source");
  // console.log("moonsae topButtonSection channel", userChannel);

  if (!userChannel) return null;

  const { channelType, channelId, otherUser, postId } = userChannel;
  const legacyChannelParts =
    userChannel.schemaVersion === 2 ? [] : channelId.split("_");
  const resolvedPostId =
    postId ??
    (channelType === "jobPostingApplicant" || channelType === "jobPostingStore"
      ? legacyChannelParts[legacyChannelParts.length - 2]
      : legacyChannelParts[legacyChannelParts.length - 1]);

  const renderButtons = () => {
    switch (channelType) {
      case "jobPostingApplicant":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <SendResumeButton
              channelId={channelId}
              senderId={userId}
              receiverId={otherUser.id}
            />
            <ViewJobPostingButton postId={resolvedPostId} />
            <LeaveButton />
          </>
        );
      case "jobPostingStore":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewJobPostingButton postId={resolvedPostId} />
            <LeaveButton />
          </>
        );
      case "resumeApplicant":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewResumeButton postId={resolvedPostId} />
            <LeaveButton />
          </>
        );
      case "resumeStore":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewResumeButton postId={resolvedPostId} />
            <LeaveButton />
          </>
        );
      default:
        return null;
    }
  };
  return <Container>{renderButtons()}</Container>;
};

export default TopButtonSection;
