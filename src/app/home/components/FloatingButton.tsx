import { useRouter, useSearchParams } from "next/navigation";

import WriteIcon from "@/components/icons/write-icon";
import { colors } from "@/styles/colors";
import numberToVw from "@/lib/dpi-number-converter";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

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
  position: fixed;
  right: max(${pxToVw(15)}, calc((100% - 600px) / 2 + ${pxToVw(15)}));
  bottom: ${pxToVw(15)};
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

const AdditionalButton = styled(WriteButton)<{ offset: number }>`
  background-color: ${colors.black};
  bottom: ${(props) => props.offset}px;
  right: max(${pxToVw(17.5)}, calc((100% - 600px) / 2 + ${pxToVw(17.5)}));
  width: ${pxToVw(55)};
  height: ${pxToVw(55)};
`;

const AdditionalButtonText = styled(WriteButtonText)`
  color: ${colors.white};
`;

const FloatingButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = "web";
  const { checkMyResumeExist } = useResumeListStore((state) => ({
    checkMyResumeExist: state.checkMyResumeExist,
  }));
  const { setRole } = useJobPostingEditStore((state) => ({
    setRole: state.setRole,
  }));
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const handleResumeClick = async () => {
    if (!userId) {
      return;
    }
    const { status, data } = await checkMyResumeExist();

    if (status) {
      router.push(`/resume/${data!.id}/edit?source=${source}`);
    } else {
      router.push(`/resume/new/edit?source=${source}`);
    }
  };

  const handleJobPostingClick = () => {
    setRole(null);
    router.push(`/job-posting/new/edit?source=${source}`);
  };

  return (
    <Container>
      <AdditionalButton offset={numberToVw(15)} onClick={handleJobPostingClick}>
        <WriteIcon />
        <AdditionalButtonText>{`매장공고\n등록`}</AdditionalButtonText>
      </AdditionalButton>
      <AdditionalButton offset={numberToVw(85)} onClick={handleResumeClick}>
        <WriteIcon />
        <AdditionalButtonText>{`이력서\n작성`}</AdditionalButtonText>
      </AdditionalButton>
    </Container>
  );
};

export default FloatingButton;
