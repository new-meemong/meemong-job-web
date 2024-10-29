"use client";

import ResumeHeader from "@/components/headers/resume-header";
import pxToVw from "@/lib/dpi-converter";
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
import { useAuthStore } from "@/stores/auth-store";
import StoreFloatingButton from "@/components/buttons/store-floating-button";
import { useEffect } from "react";

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

export default function PageContent({ resume }: { resume: ResumeType }) {
  const { userId } = useAuthStore((state) => ({
    userId: state.userId
  }));

  const isMine = resume.userId.toString() === userId;

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 최상단으로 이동
  }, []);

  return (
    <Container>
      <ResumeHeader
        title="이력서"
        resumeId={resume.id}
        isMine={isMine}
        isEnableButton={!!userId}
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
      {!userId && <StoreFloatingButton title={"어플 다운 후 제안하기"} />}
    </Container>
  );
}
