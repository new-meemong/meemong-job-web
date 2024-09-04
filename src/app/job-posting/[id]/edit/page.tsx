"use client";

import JobPostingEditHeader from "@/components/headers/job-posting-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";
import JobPostingEditTitle from "./components/job-posting-edit-title";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 ${pxToVw(24)};
`;

export default function JobPostingEditPage() {
  const { id } = useParams();

  return (
    <Container>
      <JobPostingEditHeader />
      {`${id} 구인공고 수정`}
      <ContentContainer>
        <JobPostingEditTitle />
      </ContentContainer>
    </Container>
  );
}
