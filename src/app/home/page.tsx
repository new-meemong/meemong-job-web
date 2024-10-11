"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import HomeTitle from "./components/home-title";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { HomeTopTabType, useAppStateStore } from "@/stores/app-state-store";
import JobPostingSection from "./components/job-posting-section";
import ResumeSection from "./components/resume-section";
import { WEBVIEW_API_KEY } from "@/apis/consts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface SearchParams {
  searchParams: {
    userId: string;
  };
}

const JwtSpan = styled.span`
  width: 100%; /* 화면 너비를 꽉 채움 */
  word-wrap: break-word; /* 단어가 화면을 넘어갈 때 줄바꿈 */
  word-break: break-all; /* 단어가 너무 길 경우 줄바꿈 */
  overflow-wrap: break-word; /* 텍스트가 박스를 넘으면 줄바꿈 */
  padding: 10px;
`;

export default function HomePage({ searchParams }: SearchParams) {
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { getJobPostingList } = useJobPostingListStore((state) => ({
    getJobPostingList: state.getJobPostingList
  }));
  const { getResumeList } = useResumeListStore((state) => ({
    getResumeList: state.getResumeList
  }));
  const { homeTopTab, setHomeTopTab } = useAppStateStore((state) => ({
    homeTopTab: state.homeTopTab,
    setHomeTopTab: state.setHomeTopTab
  }));

  const userId = searchParams.userId;
  const [loading, setLoading] = useState(true);

  const { login, jwt } = useAuthStore((state) => ({
    login: state.login,
    jwt: state.jwt
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
      if (userId && !jwt) {
        const result = await login("3");
        if (!result) {
          setIsLoginFailed(true);
        }
      }
    };
    _login();
  }, [userId, login, jwt]);

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
      <FloatingButton />
    </Container>
  );
}
