import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { messageType } from "@/types/send-app-message-type";

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

interface BottomButtonSectionProps {
  postUserId: string;
}

const BottomButtonSection = ({ postUserId }: BottomButtonSectionProps) => {
  const handleSuggestButtonClick = () => {
    if (typeof window !== "undefined" && window.startChat) {
      const postUrl = window.location.href;
      const postId = postUrl.split("/").pop() as string;
      const message = {
        type: "resume" as messageType,
        postId,
        postUserId
      };
      window.startChat(message);
    } else {
      console.log("startChat function is not available.");
    }
  };
  return (
    <Container>
      <SuggestButton onClick={handleSuggestButtonClick}>제안하기</SuggestButton>
    </Container>
  );
};

export default BottomButtonSection;
