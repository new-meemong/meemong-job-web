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
import CenterSpinner from "@/components/spinners/center-spinner";
import Metadata from "./components/metadata";
import { IMAGE_STORAGE_URL } from "@/apis/consts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};

  @media (min-width: 600px) {
    border: 1px solid grey;
  }
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
      setIsLoading(true);
      const { status, data } = await getResume(resumeId);

      if (status) {
        setResume(data as ResumeType);
      }
      setIsLoading(false);
    };
    if (resumeId && resumeId !== "new") {
      fetchResume();
    }
  }, [resumeId]);

  if (isLoading) {
    return (
      <>
        <Metadata
          ogUrl={`https://meemong-job-web.vercel.app/resume/${resumeId}`}
          ogImage="https://meemong-job-storage.s3.ap-northeast-2.amazonaws.com/uploads/resumes/profiles/2024/10/15/images/9dbf494e-70b4-4e2e-8fef-3e31fb998a26/s1024/9dbf494e-70b4-4e2e-8fef-3e31fb998a26.jpg"
          ogTitle={"로딩 메타데이터"}
          ogDescription="로딩중입니다."
        />
        <CenterSpinner />
      </>
    );
  }

  if (!resume) {
    return (
      <>
        <Metadata
          ogUrl={`https://meemong-job-web.vercel.app/resume/${resumeId}`}
          ogImage="https://meemong-job-storage.s3.ap-northeast-2.amazonaws.com/uploads/resumes/profiles/2024/10/15/images/9dbf494e-70b4-4e2e-8fef-3e31fb998a26/s1024/9dbf494e-70b4-4e2e-8fef-3e31fb998a26.jpg"
          ogTitle={"없음 메타데이터"}
          ogDescription="존재하지 않는 이력서입니다."
        />
        <div>존재하지 않는 이력서입니다.</div>;
      </>
    );
  }
  return (
    <Container>
      <Metadata
        ogImage={`${IMAGE_STORAGE_URL}${resume.profileImageUri}`}
        ogTitle={resume.userName}
        ogDescription={resume.shortDescription}
        ogUrl={`https://meemong-job-web.vercel.app/resume/${resumeId}`}
      />
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
      {userId && !isMine && (
        <BottomButtonSection postUserId={resume.User.UserID.toString()} />
      )}
    </Container>
  );
}
