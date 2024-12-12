import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${pxToVw(2)};
  width: ${pxToVw(70)};

  height: fit-content;
  cursor: pointer;
`;

const Label = styled.div`
  ${fonts.greyNormal12}
`;

const HowToUseButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/chat/job-posting/how-to-use");
  };
  return (
    <Container onClick={handleClick}>
      <ChatHowToUseIcon />
      <Label>이용방법</Label>
    </Container>
  );
};

export default HowToUseButton;
