"use client";

import ResumeHeader from "@/components/headers/resume-header";
import pxToVw from "@/lib/dpi-converter";
import { useAuthStore } from "@/stores/auth-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ProfileSection from "./components/profile-section";
import Divider from "./components/divider";
import UserProfile from "./components/user-profile-section";
import TitleSection from "./components/title-section";
import RequiredInfoSection from "./components/required-info-section";
import OptionalInfoSection from "./components/optional-info-section";
import SelfIntroductionSection from "./components/self-introduction-section";
import BottomButtonSection from "./components/bottom-button-section";
import { ResumeType } from "@/types/resume-type";
import { useEffect, useState } from "react";

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
  padding-top: ${pxToVw(24)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

export default function ResumePage() {
  const { id } = useParams();
  const [resume, setResume] = useState<ResumeType | null>(null);
  const resumeId: string = Array.isArray(id) ? id[0] : id;
  const { getResume } = useResumeListStore((state) => ({
    getResume: state.getResume
  }));
  const { userId } = useAuthStore((state) => ({
    userId: state.userId
  }));

  const isMine = resume?.userId.toString() === userId;

  useEffect(() => {
    const fetchResume = async () => {
      const { status, data } = await getResume(resumeId);

      if (status) {
        setResume(data as ResumeType);
      }
    };
    if (resumeId && resumeId !== "new") {
      fetchResume();
    }
  }, [resumeId]);

  if (!resume) {
    return <div>존재하지 않는 이력서입니다.</div>;
  }
  return (
    <Container>
      <ResumeHeader
        title={`이력서`}
        resumeId={resumeId}
        isMine={isMine}
        isEnableButton={userId ? true : false}
      />
      <ProfileSection resume={resume} />
      <ContentContainer>
        <UserProfile
          userImage={resume.User.ProfilePictureURL}
          userName={resume.User.DisplayName || resume.userName}
          userId={resume.User.id}
        />
        <Divider />
        <TitleSection title={resume.shortDescription} />
        <Divider />
        <RequiredInfoSection resume={resume} />
        <Divider />
        <OptionalInfoSection resume={resume} />
        <Divider />
        <SelfIntroductionSection description={resume.description} />
      </ContentContainer>
      {userId && <BottomButtonSection postUserId={resume.userId.toString()} />}
    </Container>
  );
}
