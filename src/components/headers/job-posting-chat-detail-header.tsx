import BackIcon from "./header-icons/back-icon";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";
// import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${pxToVw(52)};
  padding-bottom: ${pxToVw(12)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  position: sticky;
  top: 0;
  background-color: white;
  /* border-bottom: ${pxToVw(1)} solid ${colors.greyLine}; */
  z-index: 1;
`;

const LeftContainer = styled.div`
  width: ${pxToVw(40)};
`;

const RightContainer = styled.div`
  width: ${pxToVw(40)};
`;

const Title = styled.span`
  ${fonts.greyTextBold18}
`;

const JobPostingChatDetailHeader = ({
  otherUserDisplayName,
  source,
}: {
  otherUserDisplayName: string;
  source: string;
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (source === "app") {
      window.closeWebview("close");
    } else {
      router.back();
    }
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{otherUserDisplayName}</Title>
      <RightContainer />
    </Container>
  );
};

export default JobPostingChatDetailHeader;
