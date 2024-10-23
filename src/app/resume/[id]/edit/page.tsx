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
import { useResumeListStore } from "@/stores/resume-list-store";
import { ResumeType } from "@/types/resume-type";

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

interface SearchParams {
  searchParams: {
    userId: string;
  };
}

export default function ResumeEditPage({ searchParams }: SearchParams) {
  const { id } = useParams();
  const resumeId = Array.isArray(id) ? id[0] : id;
  const { UserID, sex, login, jwt } = useAuthStore((state) => ({
    sex: state.sex,
    UserID: state.UserID,
    login: state.login,
    jwt: state.jwt
  }));
  const { setId, setSex, resetStore, setFromResume } = useResumeEditStore(
    (state) => ({
      setId: state.setId,
      setSex: state.setSex,
      resetStore: state.resetStore,
      setFromResume: state.setFromResume
    })
  );
  const { checkMyResumeExist } = useResumeListStore((state) => ({
    checkMyResumeExist: state.checkMyResumeExist
  }));

  const userId = UserID ? UserID : searchParams.userId;

  useEffect(() => {
    const _fetch = async () => {
      if (!jwt) {
        await login(userId);
      }

      const { data } = await checkMyResumeExist();

      if (data) {
        resetStore();
        setFromResume(data as ResumeType);

        if (resumeId !== "new") {
          setId(resumeId);
        }
        if (resumeId === "new") {
          setId(null);
        }
      }
    };

    if (userId) {
      _fetch();
    }
  }, [userId]);

  useEffect(() => {
    if (sex) {
      setSex(sex);
    }
  }, [sex, setSex]);

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
