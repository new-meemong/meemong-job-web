"use client";

import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import FindDesignerRequiredFilter from "./components/sections/find-designer/find-designer-required-filter";
import HomeTitle from "./components/home-title";
import TalentSearchButton from "./components/filters/talent-search-button";
import Banner from "./components/banner";
import HomeSearchResultList from "./components/sections/find-designer/home-designer-search-list";
import pxToVw from "@/lib/dpi-converter";
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
      {activeTab === 0 ? <FindDesignerSection /> : <FindJobSection />}
      <FloatingButton />
    </Container>
  );
}
