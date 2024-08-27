"use client";

import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./ components/base-top-tab";
import FloatingButton from "./ components/floating-button";
import FindDesignerMainOption from "./ components/find-designer-main-option";
import HomeTitle from "./ components/home-title";
import TalentSearchButton from "./ components/options/talent-search-button";

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
  box-sizing: border-box;
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeTitle />
      <FindDesignerMainOption />
      <TalentSearchWrapper>
        <TalentSearchButton />
      </TalentSearchWrapper>
      <FloatingButton />
    </Container>
  );
}
