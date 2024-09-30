"use client";

import ResumeHeader from "@/components/headers/resume-header";
import pxToVw from "@/lib/dpi-converter";
import { useAuthStore } from "@/stores/auth-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useParams } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};
`;

export default function ResumePage() {
  const { id } = useParams();
  const resumeId: string = Array.isArray(id) ? id[0] : id;
  const { resumeList } = useResumeListStore((state) => ({
    resumeList: state.resumeList
  }));
  const { userId } = useAuthStore((state) => ({
    userId: state.userId
  }));

  const resume = resumeList.find((resume) => resume.id.toString() === id);

  const isMine = resume?.userId.toString() === userId;

  if (!resume) {
    return <div>존재하지 않는 이력서입니다.</div>;
  }

  return (
    <Container>
      <ResumeHeader title={`이력서`} resumeId={resumeId} isMine={isMine} />
      {`${id} 이력서`}
    </Container>
  );
}
