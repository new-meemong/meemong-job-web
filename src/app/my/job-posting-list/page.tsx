"use client";

import MyJobPostingListHeader from "@/components/headers/my-job-posting-list-header";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};

  @media (min-width: 600px) {
    border: 1px solid grey;
  }
`;

export default function MyJobPostingListPage() {
  return (
    <Container>
      <MyJobPostingListHeader />
      <div>MyJobPostingListPage</div>
    </Container>
  );
}
