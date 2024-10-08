import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  height: ${pxToVw(70)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const SuggestButton = styled.div`
  ${fonts.whiteBold16}
  width: 100%;
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomButtonSection = () => {
  const handleSuggestButtonClick = () => {
    // router.push("/suggest");
  };
  return (
    <Container>
      <SuggestButton onClick={handleSuggestButtonClick}>제안하기</SuggestButton>
    </Container>
  );
};

export default BottomButtonSection;
