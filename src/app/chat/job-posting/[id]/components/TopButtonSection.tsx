import ArrangeInterviewButton from "./buttons/ArrangeInterviewButton";
import HowToUseButton from "./buttons/HowToUseButton";
import LeaveButton from "./buttons/LeaveButton";
import SendResumeButton from "./buttons/SendResumeButton";
import { UserJobPostingChatChannelType } from "@/types/chat/user-job-posting-chat-channel-type";
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
}: {
  userChannel: UserJobPostingChatChannelType | null;
}) => {
  const source = useSearchParams().get("source");
  // console.log("moonsae topButtonSection channel", userChannel);

  if (!userChannel) return null;

  const { channelType } = userChannel;

  const renderButtons = () => {
    switch (channelType) {
      case "jobPostingApplicant":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <SendResumeButton />
            <ViewJobPostingButton />
            <LeaveButton />
          </>
        );
      case "jobPostingStore":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewJobPostingButton />
            <LeaveButton />
          </>
        );
      case "resumeApplicant":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewResumeButton />
            <LeaveButton />
          </>
        );
      case "resumeStore":
        return (
          <>
            <HowToUseButton />
            <ArrangeInterviewButton />
            <ViewResumeButton />
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
