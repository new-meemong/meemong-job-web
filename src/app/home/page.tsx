"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import HomeTitle from "./components/home-title";
import FindDesignerSection from "./components/sections/find-resume/find-designer-section";
import FindJobSection from "./components/sections/find-job-posting/find-job-section";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useResumeListStore } from "@/stores/resume-list-store";
import { TabType, useAppStateStore } from "@/stores/app-state-store";

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
  const { activeTab, setActiveTab } = useAppStateStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab
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
      setActiveTab(storedTab as TabType); // localStorage 값으로 activeTab 설정
    }
    setLoading(false); // 로딩 종료
  }, [setActiveTab]);

  useEffect(() => {
    if (userId && !jwt) {
      login(userId);
    }
  }, [userId, login, jwt]);

  useEffect(() => {
    if (jwt) {
      if (activeTab === "jobPosting") {
        getJobPostingList();
      } else if (activeTab === "resume") {
        getResumeList();
      }
    }
  }, [activeTab, getJobPostingList, getResumeList, jwt]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 보여줄 화면
  }

  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeTitle />
      {activeTab === "jobPosting" ? (
        <FindJobSection />
      ) : (
        <FindDesignerSection />
      )}
      <FloatingButton />
    </Container>
  );
}
