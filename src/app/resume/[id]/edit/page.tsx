"use client";

import ResumeEditHeader from "@/components/headers/resume-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function ResumeEditPage() {
  const { id } = useParams();

  return (
    <Container>
      <ResumeEditHeader />
      {`${id} 이력서 수정`}
    </Container>
  );
}
