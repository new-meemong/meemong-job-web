"use client";

import ResumeEditHeader from "@/components/headers/resume-edit-header";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ProfileImageSection from "./components/profile-image-section";
import pxToVw from "@/lib/dpi-converter";
import RequiredFieldSection from "./components/required-field-section";
import OptionalFieldSection from "./components/optional-field-section";
import BottomButtonSection from "./components/bottom-button-section";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};
`;

const ContentContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  padding-top: ${pxToVw(32)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
  width: 100%;
`;

export default function ResumeEditPage() {
  const { id } = useParams();
  const resumeId = Array.isArray(id) ? id[0] : id;
  const { sex } = useAuthStore((state) => ({
    sex: state.sex
  }));
  const { setId, setSex } = useResumeEditStore((state) => ({
    setId: state.setId,
    setSex: state.setSex
  }));
  useEffect(() => {
    if (sex) {
      setSex(sex);
    }

    if (resumeId !== "new") {
      setId(resumeId);
    }
  }, [resumeId, setId, sex, setSex]);

  return (
    <Container>
      <ResumeEditHeader />
      <ContentContainer>
        <ProfileImageSection />
        <RequiredFieldSection />
        <OptionalFieldSection />
      </ContentContainer>
      <BottomButtonSection />
    </Container>
  );
}
