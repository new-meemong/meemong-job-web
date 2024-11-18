"use client";

import BottomButtonSection from "./components/bottom-button-section";
import OptionalFieldSection from "./components/optional-field-section";
import ProfileImageSection from "./components/profile-image-section";
import RequiredFieldSection from "./components/required-field-section";
import ResumeEditHeader from "@/components/headers/resume-edit-header";
import { ResumeType } from "@/types/resume-type";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { useResumeListStore } from "@/stores/resume-list-store";

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
    source?: string;
  };
}

export default function ResumeEditPage({ searchParams }: SearchParams) {
  const { id } = useParams();
  const resumeId = Array.isArray(id) ? id[0] : id;
  const { UserID, sex, login, jwt } = useAuthStore((state) => ({
    sex: state.sex,
    UserID: state.UserID,
    login: state.login,
    jwt: state.jwt,
  }));
  const { setId, setSex, resetStore, setFromResume } = useResumeEditStore(
    (state) => ({
      setId: state.setId,
      setSex: state.setSex,
      resetStore: state.resetStore,
      setFromResume: state.setFromResume,
    }),
  );
  const { checkMyResumeExist } = useResumeListStore((state) => ({
    checkMyResumeExist: state.checkMyResumeExist,
  }));

  const _UserID = UserID ? UserID : searchParams.userId;
  const source = searchParams.source;

  useEffect(() => {
    const _fetch = async () => {
      if (!jwt) {
        await login(_UserID);
      }

      const { data } = await checkMyResumeExist();
      if (data) {
        resetStore();
        setFromResume(data as ResumeType);
      }

      if (resumeId !== "new") {
        setId(resumeId);
      }
      if (resumeId === "new") {
        setId(null);
      }

      if (sex) {
        setSex(sex);
      }
    };

    if (_UserID) {
      _fetch();
    }
  }, [_UserID]);

  return (
    <Container>
      <ResumeEditHeader source={source} />
      <ContentContainer>
        <ProfileImageSection />
        <RequiredFieldSection />
        <OptionalFieldSection />
      </ContentContainer>
      <BottomButtonSection source={source} />
    </Container>
  );
}
