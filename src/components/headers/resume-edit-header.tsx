import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

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
  console.log("moonsae source", source);
  const handleBackClick = () => {
    if (source && source === "web") {
      router.back();
    }
    window.close();
    window.GoBack();

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
