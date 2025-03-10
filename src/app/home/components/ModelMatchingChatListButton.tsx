import { useRouter, useSearchParams } from "next/navigation";

import WriteIcon from "@/components/icons/write-icon";
import { colors } from "@/styles/colors";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";

const Container = styled.div``;

const WriteButton = styled.div`
  width: ${pxToVw(60)};
  height: ${pxToVw(60)};
  background-color: ${colors.purplePrimary};
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: ${pxToVw(0)} ${pxToVw(0)} ${pxToVw(10)} ${pxToVw(1)}
    rgba(93, 84, 183, 0.7);
  position: fixed; /* 화면에 고정 */
  right: ${pxToVw(90)}; /* 오른쪽에서 15px */
  bottom: ${pxToVw(85)}; /* 하단에서 15px */
`;

const WriteButtonText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-weight: 700;
  font-size: ${pxToVw(10)};
  text-align: center;
  color: ${colors.white};
  margin-top: ${pxToVw(2)};
  white-space: pre-line;
`;

const ModelMatchingChatListButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const source = searchParams.get("source") || "web";
  const source = "web"; // 앱내의 웹에서 들어가는 버튼이라 무조건 웹
  const { UserID } = useAuthStore((state) => ({
    UserID: state.UserID,
  }));

  const handleClick = () => {
    router.push(`/chat/model-matching?userId=${UserID}&source=${source}`);
  };

  return (
    <Container>
      <WriteButton onClick={handleClick}>
        <WriteIcon />
        <WriteButtonText>{`모델매칭채팅`}</WriteButtonText>
      </WriteButton>
    </Container>
  );
};

export default ModelMatchingChatListButton;
