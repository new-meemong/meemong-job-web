"use client";

import JobPostingHeader from "@/components/headers/job-posting-header";
import { useParams } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function JobPostingPage() {
  const { id } = useParams();

  return (
    <Container>
      <JobPostingHeader title={"구인공고"} />
      {`구인공고`}
    </Container>
  );
}
