import { useParams, useSearchParams } from "next/navigation";

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

const ViewResumeButton = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const channelId = Array.isArray(params.id) ? params.id[0] : params.id;

  const handleClick = () => {
    // channelId에서 jobPosting id 추출
    const resumeId = channelId.split("_")[4];

    if (source === "web") {
      // 새 탭에서 job posting 페이지 열기
      window.open(
        `/resume/${resumeId}?noButton=true&source=${source}`,
        "_blank",
      );
    }

    if (
      source === "app" &&
      typeof window !== "undefined" &&
      window.externalLink
    ) {
      window.externalLink(
        `${WEB_DOMAIN}/resume/${resumeId}?noButton=true&source=${source}`,
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
