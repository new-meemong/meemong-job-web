"use client";

import JobPostingEditHeader from "@/components/headers/job-posting-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function JobPostingEditPage() {
  const { id } = useParams();

  return (
    <Container>
      <JobPostingEditHeader />
      {`${id} 구인공고 수정`}
    </Container>
  );
}
