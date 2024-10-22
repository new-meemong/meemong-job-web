"use client";

import Banner from "@/app/home/components/banner";
import SearchResultHeader from "@/components/headers/search-result-header";
import ResumeItem from "@/components/resume-item";
import SearchFilterInput from "@/components/search-filter-input";
import CenterSpinner from "@/components/spinners/center-spinner";
import pxToVw from "@/lib/dpi-converter";
import { parseQueryString } from "@/lib/parse-query-string";
import { useResumeListStore } from "@/stores/resume-list-store";
import { fonts } from "@/styles/fonts";
import { ResumeType } from "@/types/resume-type";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${pxToVw(20)};
  padding-right: ${pxToVw(20)};
  padding-top: ${pxToVw(12)};
`;

const Title = styled.span`
  ${fonts.blackBold16}
  display: block;
  margin-bottom: ${pxToVw(20)};
`;

export default function ResumeListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { resumeFilterQueries, searchResumeList, searchResultResumeList } =
    useResumeListStore((state) => ({
      resumeFilterQueries: state.resumeFilterQueries,
      searchResumeList: state.searchResumeList,
      searchResultResumeList: state.searchResultResumeList
    }));
  const [filterText, setFilterText] = useState("");
  const [filteredResumeList, setFilteredResumeList] = useState<ResumeType[]>(
    []
  );

  useEffect(() => {
    const _fetch = async () => {
      setIsLoading(true);
      try {
        const parsedQueries = parseQueryString(resumeFilterQueries);
        await searchResumeList(parsedQueries);
      } catch (error) {
        console.error(
          "Error parsing query string or fetching job postings:",
          error
        );
      } finally {
        setIsLoading(false);
      }
    };
    _fetch();
  }, [resumeFilterQueries]);

  useEffect(() => {
    const filteredResumes = searchResultResumeList.filter(
      (resume) =>
        resume.shortDescription
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        resume.preferredStoreRegions
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        resume.preferredStoreRegionSiNames
          .toLocaleLowerCase()
          .includes(filterText.toLowerCase())
    );

    setFilteredResumeList(filteredResumes);
  }, [searchResultResumeList, filterText]);

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  return (
    <Container>
      <SearchResultHeader count={filteredResumeList.length} />
      <SearchFilterInput text={filterText} onChange={handleFilterTextChange} />
      <Banner />
      {isLoading ? (
        <CenterSpinner />
      ) : (
        <ContentContainer>
          <Title>맞춤 검색 결과</Title>
          {filteredResumeList.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
          ))}
        </ContentContainer>
      )}
    </Container>
  );
}
