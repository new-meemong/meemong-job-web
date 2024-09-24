"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import HomeTitle from "./components/home-title";
import FindDesignerSection from "./components/sections/find-designer/find-designer-section";
import FindJobSection from "./components/sections/find-job/find-job-section";
import { useAuthStore } from "@/stores/auth-store";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

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
  const { getJobPostingList } = useJobPostingListStore();
  const [activeTab, setActiveTab] = useState(0);
  const userId = searchParams.userId;

  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (userId) {
      login(userId);
    }
  }, [userId, login]);

  useEffect(() => {
    if (activeTab === 0) {
      getJobPostingList();
    }
  }, [activeTab]);

  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeTitle />
      {activeTab === 0 ? <FindJobSection /> : <FindDesignerSection />}
      <FloatingButton />
    </Container>
  );
}
