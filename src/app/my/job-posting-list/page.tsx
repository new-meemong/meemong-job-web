"use client";

import MyJobPostingListHeader from "@/components/headers/my-job-posting-list-header";
import pxToVw from "@/lib/dpi-converter";
import { useAuthStore } from "@/stores/auth-store";
import { useMyJobPostingListStore } from "@/stores/my-job-posting-list-store";
import { useEffect } from "react";
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

interface SearchParams {
  searchParams: {
    token: string;
  };
}

export default function MyJobPostingListPage({ searchParams }: SearchParams) {
  const { getMyJobPostingList } = useMyJobPostingListStore((state) => ({
    getMyJobPostingList: state.getMyJobPostingList
  }));
  const { setJwt } = useAuthStore((state) => ({
    setJwt: state.setJwt
  }));

  const jwt = searchParams.token;
  console.log("moonsae screen jwt", jwt);
  useEffect(() => {
    const _fetch = async () => {
      setJwt(jwt);
      await getMyJobPostingList();
    };

    if (jwt) {
      _fetch();
    }
  }, [getMyJobPostingList, jwt]);
  return (
    <Container>
      <MyJobPostingListHeader />
      <div>MyJobPostingListPage</div>
    </Container>
  );
}
