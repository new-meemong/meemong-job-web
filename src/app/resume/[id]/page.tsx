"use client";

import ResumeHeader from "@/components/headers/resume-header";
import { useParams } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function ResumePage() {
  const { id } = useParams();

  return (
    <Container>
      <ResumeHeader title={`이력서`} />
      {`${id} 이력서`}
    </Container>
  );
}
