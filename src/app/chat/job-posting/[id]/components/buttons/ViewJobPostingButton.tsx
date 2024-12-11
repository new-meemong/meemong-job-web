import { useParams, useSearchParams } from "next/navigation";

import ChatViewJobPostingIcon from "@/components/icons/chats/ChatViewJobPostingIcon";
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

const ViewJobPostingButton = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  const channelId = Array.isArray(params.id) ? params.id[0] : params.id;

  const handleClick = () => {
    // channelId에서 jobPosting id 추출
    const jobPostingId = channelId.split("_")[3];

    if (source === "web") {
      // 새 탭에서 job posting 페이지 열기
      window.open(
        `/job-posting/${jobPostingId}?noButton=true&source=${source}`,
        "_blank",
      );
    }

    if (
      source === "app" &&
      typeof window !== "undefined" &&
      window.externalLink
    ) {
      window.externalLink(
        `${WEB_DOMAIN}/job-posting/${jobPostingId}?noButton=true&source=${source}`,
      );
    }
  };
  return (
    <Container onClick={handleClick}>
      <ChatViewJobPostingIcon />
      <Label>모집공고 보기</Label>
    </Container>
  );
};

export default ViewJobPostingButton;
