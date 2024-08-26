"use client";

import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";
import BaseTopTabs from "./ components/base-top-tab";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  console.log("activeTab", activeTab);
  return (
    <Container>
      <BaseTopTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </Container>
  );
}
