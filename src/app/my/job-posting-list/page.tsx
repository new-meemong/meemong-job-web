"use client";

import MyJobPostingItem from "@/components/my-job-posting-item";
import MyJobPostingListHeader from "@/components/headers/my-job-posting-list-header";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useMyJobPostingListStore } from "@/stores/my-job-posting-list-store";

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

const SubHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: ${pxToVw(24)};
`;

const SubHeaderText = styled.div`
  ${fonts.blackBold16}
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${pxToVw(100)};
`;

const EmptyText = styled.div`
  ${fonts.greySemi20}
  white-space: pre-line;
  text-align: center;
`;

interface SearchParams {
  searchParams: {
    userId: string;
    source?: string;
  };
}

export default function MyJobPostingListPage({ searchParams }: SearchParams) {
  const { myJobPostingList, getMyJobPostingList } = useMyJobPostingListStore(
    (state) => ({
      getMyJobPostingList: state.getMyJobPostingList,
      myJobPostingList: state.myJobPostingList
    })
  );
  const { login, jwt } = useAuthStore((state) => ({
    login: state.login,
    jwt: state.jwt
  }));

  const userId = searchParams.userId;
  const source = searchParams.source;

  useEffect(() => {
    const _fetch = async () => {
      if (!jwt) {
        await login(userId);
      }

      await getMyJobPostingList();
    };

    if (userId) {
      _fetch();
    }
  }, [getMyJobPostingList, userId, jwt, login]);

  return (
    <Container>
      <MyJobPostingListHeader source={source} />
      <SubHeaderContainer>
        <SubHeaderText>{`총 게시글 (${myJobPostingList.length})`}</SubHeaderText>
      </SubHeaderContainer>
      {myJobPostingList.length === 0 ? (
        <EmptyContainer>
          {" "}
          <EmptyText>{`덩그러니~!\n게시글이 없어요.`}</EmptyText>
        </EmptyContainer>
      ) : (
        myJobPostingList.map((jobPosting) => {
          return (
            <MyJobPostingItem key={jobPosting.id} jobPosting={jobPosting} />
          );
        })
      )}
    </Container>
  );
}
