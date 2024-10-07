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

export default function HomePage({ searchParams }: SearchParams) {
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
    if (userId && !jwt) {
      login(userId);
    }
  }, [userId, login, jwt]);

  useEffect(() => {
    if (jwt) {
      if (homeTopTab === "jobPosting") {
        getJobPostingList();
      } else if (homeTopTab === "resume") {
        getResumeList();
      }
    }
  }, [homeTopTab, getJobPostingList, getResumeList, jwt]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 화면
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
