import { useSearchParams } from "next/navigation";

import ChatHowToUseIcon from "@/components/icons/chats/ChatHowToUseIcon";
import ChatLeaveIcon from "@/components/icons/chats/ChatLeaveIcon";
import ChatSendResumeIcon from "@/components/icons/chats/ChatSendResumeIcon";
import ChatViewResumeIcon from "@/components/icons/chats/ChatViewResumeIcon";
import { WEB_DOMAIN } from "@/apis/consts";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

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

const ViewResumeButton = ({ postId }: { postId?: string }) => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const handleClick = () => {
    if (!postId) return;

    if (source === "web") {
      // 새 탭에서 job posting 페이지 열기
      window.open(`/resume/${postId}?noButton=true&source=${source}`, "_blank");
    }

    if (
      source === "app" &&
      typeof window !== "undefined" &&
      window.externalLink
    ) {
      window.externalLink(
        `${WEB_DOMAIN}/resume/${postId}?noButton=true&source=${source}`,
      );
    }
  };

  return (
    <Container onClick={handleClick}>
      <ChatViewResumeIcon />
      <Label>이력서 보기</Label>
    </Container>
  );
};

export default ViewResumeButton;
