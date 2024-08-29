"use client";

import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./components/base-top-tab";
import FloatingButton from "./components/floating-button";
import FindDesignerRequiredFilter from "./components/find-designer-required-filter";
import HomeTitle from "./components/home-title";
import TalentSearchButton from "./components/filters/talent-search-button";
import Banner from "./components/banner";
import HomeSearchResultList from "./components/home-search-list";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TalentSearchWrapper = styled.div`
  width: 100%;
  margin-top: 12px;
  padding-left: 24px;
  padding-right: 24px;
`;

export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeTitle />
      <FindDesignerRequiredFilter />
      <TalentSearchWrapper>
        <TalentSearchButton />
      </TalentSearchWrapper>
      <Banner />
      <HomeSearchResultList />
      <FloatingButton />
    </Container>
  );
}
