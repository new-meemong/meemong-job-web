import WriteIcon from "@/components/icons/write-icon";
import { colors } from "@/styles/colors";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

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
  right: ${pxToVw(15)}; /* 오른쪽에서 15px */
  bottom: ${pxToVw(15)}; /* 하단에서 15px */
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

const MyJobPostingFloatingButton = () => {
  const router = useRouter();
  const { UserID } = useAuthStore((state) => ({
    UserID: state.UserID,
  }));

  const handleClick = () => {
    router.push(`/my/job-posting-list?userId=${UserID}&source=web`);
  };

  return (
    <Container>
      <WriteButton onClick={handleClick}>
        <WriteIcon />
        <WriteButtonText>{`내가 쓴\n공고보기`}</WriteButtonText>
      </WriteButton>
    </Container>
  );
};

export default MyJobPostingFloatingButton;
