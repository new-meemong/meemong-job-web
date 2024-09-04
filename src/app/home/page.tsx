"use client";

import { useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import HomeTitle from "./components/home-title";
import FindDesignerSection from "./components/sections/find-designer/find-designer-section";
import FindJobSection from "./components/sections/find-job/find-job-section";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeTitle />
      {activeTab === 0 ? <FindJobSection /> : <FindDesignerSection />}
      <FloatingButton />
    </Container>
  );
}
