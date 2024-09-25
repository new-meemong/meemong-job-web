"use client";

import JobPostingEditHeader from "@/components/headers/job-posting-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";
import JobPostingEditTitle from "./components/job-posting-edit-title";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import JobPostingEditSearchLocation from "./components/job-posting-edit-search-location";
import Divider from "./components/divider";
import JobPostingEditBaseOption from "./components/job-posting-edit-base-option";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useEffect } from "react";
import { useRouter } from "next/router";

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
  const { id } = useParams();
  const postingId = Array.isArray(id) ? id[0] : id;
  const { setId } = useJobPostingEditStore((state) => ({
    setId: state.setId
  }));

  useEffect(() => {
    if (postingId !== "new") {
      setId(postingId);
    }
  }, [postingId, setId]);

  return (
    <Container>
      <JobPostingEditHeader />
      <ContentContainer>
        <JobPostingEditTitle />
        <JobPostingEditSearchLocation />
        <Divider />
        <JobPostingEditBaseOption />
      </ContentContainer>
    </Container>
  );
}
