"use client";

import { HomeTopTabType, useAppStateStore } from "@/stores/app-state-store";
import { useEffect, useState } from "react";

import BaseTopTabs from "./components/BaseTopTab";
import FloatingButton from "./components/floating-button";
import HomeTitle from "./components/home-title";
import JobPostingSection from "./components/job-posting-section";
import MyJobPostingFloatingButton from "./components/my-job-posting-floating-button";
import ResumeSection from "./components/resume-section";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface SearchParams {
  searchParams: {
    userId: string;
    profileImageUri: string;
    sex: string;
  };
}

export default function HomePage({ searchParams }: SearchParams) {
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { getJobPostingList } = useJobPostingListStore((state) => ({
    getJobPostingList: state.getJobPostingList,
  }));
  const { getResumeList } = useResumeListStore((state) => ({
    getResumeList: state.getResumeList,
  }));
  const { homeTopTab, setHomeTopTab } = useAppStateStore((state) => ({
    homeTopTab: state.homeTopTab,
    setHomeTopTab: state.setHomeTopTab,
  }));

  const UserID = searchParams.userId;
  const profileImageUri = searchParams.profileImageUri;
  const sex = searchParams.sex;
  const [loading, setLoading] = useState(true);

  const { jwt, login, setProfileImageUri, setSex } = useAuthStore((state) => ({
    jwt: state.jwt,
    login: state.login,
    setProfileImageUri: state.setProfileImageUri,
    setSex: state.setSex,
  }));

  useEffect(() => {
    // localStorage에서 activeTab 값을 불러오기
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setHomeTopTab(storedTab as HomeTopTabType); // localStorage 값으로 activeTab 설정
    }
    setLoading(false); // 로딩 종료
  }, [setHomeTopTab]);

  useEffect(() => {
    const _login = async () => {
      if (UserID && !jwt) {
        const result = await login(UserID);
        if (!result) {
          setIsLoginFailed(true);
        } else {
          setProfileImageUri(profileImageUri);
          // setSex(sex);
        }
      }
    };
    _login();
  }, [UserID, login, jwt]);

  useEffect(() => {
    if (jwt) {
      getJobPostingList();
      getResumeList();
    }
  }, [getJobPostingList, getResumeList, jwt]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 화면
  }

  if (isLoginFailed) {
    return <div>로그인 실패</div>;
  }

  return (
    <Container>
      <BaseTopTabs activeTab={homeTopTab} setActiveTab={setHomeTopTab} />
      <HomeTitle />
      {homeTopTab === "jobPosting" ? <JobPostingSection /> : <ResumeSection />}
      <MyJobPostingFloatingButton />
      <FloatingButton />
    </Container>
  );
}
