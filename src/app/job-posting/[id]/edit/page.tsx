"use client";

import JobPostingEditHeader from "@/components/headers/job-posting-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";
import JobPostingEditTitle from "./components/job-posting-edit-title";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import JobPostingEditSearchLocation from "./components/job-posting-edit-search-location";
import Divider from "./components/divider";
import JobPostingEditBaseInfo from "./components/job-posting-edit-base-info";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  padding-top: ${pxToVw(34)};
`;

export default function JobPostingEditPage() {
  const { title } = useJobPostingEditStore();
  const { id } = useParams();

  return (
    <Container>
      <JobPostingEditHeader />
      <ContentContainer>
        <JobPostingEditTitle />
        <JobPostingEditSearchLocation />
        <Divider />
        <JobPostingEditBaseInfo />
      </ContentContainer>
    </Container>
  );
}
