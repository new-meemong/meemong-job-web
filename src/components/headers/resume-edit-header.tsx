import BackIcon from "./header-icons/back-icon";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";

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
  border-bottom: ${pxToVw(1)} solid ${colors.greyLine};
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

const ResumeEditHeader = ({ source }: { source?: string }) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (source && source === "web") {
      router.back();
    }

    if (
      typeof window !== "undefined" &&
      window.closeWebview &&
      (source === "app" || !source)
    ) {
      window.closeWebview("close");
    }

    // if (!source && window.closeWebview) {

    // }
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>내 이력서 관리</Title>
      <RightContainer />
    </Container>
  );
};

export default ResumeEditHeader;
