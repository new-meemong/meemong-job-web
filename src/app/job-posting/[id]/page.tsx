"use client";

import { IMAGE_STORAGE_URL } from "@/apis/consts";
import JobPostingHeader from "@/components/headers/job-posting-header";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import Image from "next/image";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ImageSlider from "../components/image-slider";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function JobPostingPage() {
  const { id } = useParams();
  const { jobPostingList } = useJobPostingListStore((state) => ({
    jobPostingList: state.jobPostingList
  }));

  const jobPosting = jobPostingList.find(
    (posting) => posting.id.toString() === id
  );

  if (!jobPosting) {
    return <div>존재하지 않는 구인공고입니다.</div>;
  }

  console.log("moonsae", jobPosting);
  const { JobPostingsStoreImages } = jobPosting;

  return (
    <Container>
      <JobPostingHeader title={"구인공고"} />
      <ImageSlider
        images={JobPostingsStoreImages.map(
          (image) => `${IMAGE_STORAGE_URL}${image.uri}`
        )}
      />
    </Container>
  );
}
