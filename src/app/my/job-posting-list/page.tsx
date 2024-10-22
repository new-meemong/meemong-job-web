"use client";

import MyJobPostingListHeader from "@/components/headers/my-job-posting-list-header";
import MyJobPostingItem from "@/components/my-job-posting-item";
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
    userId: string;
  };
}

export default function MyJobPostingListPage({ searchParams }: SearchParams) {
  const { myJobPostingList, getMyJobPostingList } = useMyJobPostingListStore(
    (state) => ({
      getMyJobPostingList: state.getMyJobPostingList,
      myJobPostingList: state.myJobPostingList
    })
  );
  const { login } = useAuthStore((state) => ({
    login: state.login
  }));

  const userId = searchParams.userId;

  useEffect(() => {
    const _fetch = async () => {
      await login(userId);
      await getMyJobPostingList();
    };

    if (userId) {
      _fetch();
    }
  }, [getMyJobPostingList, userId]);

  return (
    <Container>
      <MyJobPostingListHeader />
      {myJobPostingList.map((jobPosting) => {
        return <MyJobPostingItem key={jobPosting.id} jobPosting={jobPosting} />;
      })}
    </Container>
  );
}
