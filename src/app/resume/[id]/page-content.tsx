"use client";

import { useEffect, useState } from "react";

import BottomButtonSection from "./components/bottom-button-section";
import Divider from "./components/divider";
import OptionalInfoSection from "./components/optional-info-section";
import ProfileSection from "./components/profile-section";
import RequiredInfoSection from "./components/required-info-section";
import ResumeHeader from "@/components/headers/resume-header";
import { ResumeType } from "@/types/resume-type";
import SelfIntroductionSection from "./components/self-introduction-section";
import StoreFloatingButton from "@/components/buttons/store-floating-button";
import TitleSection from "./components/title-section";
import UserProfile from "./components/user-profile-section";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useSearchParams } from "next/navigation";

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

export default function PageContent({
  initialResume,
}: {
  initialResume: ResumeType;
}) {
  const [resume, setResume] = useState<ResumeType>(initialResume);

  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const { getResume } = useResumeListStore((state) => ({
    getResume: state.getResume,
  }));

  const isMine = resume?.userId?.toString() === userId;

  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기

  const noButton = searchParams.get("noButton") || undefined; // 앱 채팅에서 하단 버튼 없이 view만 보여줄때

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 최상단으로 이동
  }, []);

  useEffect(() => {
    const _fetch = async () => {
      const { data } = await getResume(initialResume.id);

      if (data) {
        setResume(data as ResumeType);
      }
    };
    _fetch();
  }, [initialResume?.id]);

  if (!resume) {
    return <div>이력서 불러오기 실패</div>;
  }

  return (
    <Container>
      <ResumeHeader
        title="이력서"
        resumeId={resume.id}
        isMine={isMine}
        isEnableButton={!!userId}
        appliedRole={resume.appliedRole}
      />
      <ProfileSection resume={resume} />
      <ContentContainer>
        <UserProfile
          userImage={
            resume.User.profileUrl || "/images/resume_profile_default.svg"
          }
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
      {userId && !isMine && !noButton && (
        <BottomButtonSection
          postUserId={resume.User.id.toString()}
          postId={resume.id}
        />
      )}
      {!userId && <StoreFloatingButton title={"어플 다운 후 채팅하기"} />}
    </Container>
  );
}
