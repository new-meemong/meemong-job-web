import ArrangeInterviewButton from "./buttons/ArrangeInterviewButton";
import HowToUseButton from "./buttons/HowToUseButton";
import LeaveButton from "./buttons/LeaveButton";
import SendResumeButton from "./buttons/SendResumeButton";
import ViewJobPostingButton from "./buttons/ViewJobPostingButton";
import ViewResumeButton from "./buttons/ViewResumeButton";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${pxToVw(20)};
  padding-bottom: ${pxToVw(2)};
`;

const TopButtonSection = () => {
  return (
    <Container>
      <HowToUseButton />
      <ArrangeInterviewButton />
      <LeaveButton />
      <SendResumeButton />
      <ViewResumeButton />
      <ViewJobPostingButton />
    </Container>
  );
};

export default TopButtonSection;
