"use client";

import ResumeEditHeader from "@/components/headers/resume-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ProfileImageSection from "./components/profile-image-section";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  padding-top: ${pxToVw(32)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

export default function ResumeEditPage() {
  const { id } = useParams();

  return (
    <Container>
      <ResumeEditHeader />
      <ContentContainer>
        <ProfileImageSection />
      </ContentContainer>
    </Container>
  );
}
