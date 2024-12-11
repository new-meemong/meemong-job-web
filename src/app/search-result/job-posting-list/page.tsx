"use client";

import { useEffect, useState } from "react";

import Banner from "@/app/home/components/banner";
import CenterSpinner from "@/components/spinners/CenterSpinner";
import JobPostingItem from "@/components/job-posting-item";
import { JobPostingType } from "@/types/job-posting-type";
import SearchFilterInput from "@/components/search-filter-input";
import SearchResultHeader from "@/components/headers/search-result-header";
import { fonts } from "@/styles/fonts";
import { parseQueryString } from "@/lib/parse-query-string";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${pxToVw(20)};
  padding-top: ${pxToVw(12)};
`;

const Title = styled.span`
  ${fonts.blackBold16}
  display: block;
  margin-bottom: ${pxToVw(20)};
`;

export default function JobPostingListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    jobPostingFilterQueries,
    searchJobPostingList,
    searchResultJobPostingList,
  } = useJobPostingListStore((state) => ({
    jobPostingFilterQueries: state.jobPostingFilterQueries,
    searchJobPostingList: state.searchJobPosingList,
    searchResultJobPostingList: state.searchResultJobPostingList,
  }));
  const [filterText, setFilterText] = useState("");
  const [filteredJobPostingList, setFilteredJobPostingList] = useState<
    JobPostingType[]
  >([]);

  useEffect(() => {
    const _fetch = async () => {
      setIsLoading(true);
      try {
        const parsedQueries = parseQueryString(jobPostingFilterQueries);

        await searchJobPostingList(parsedQueries);
      } catch (error) {
        console.error(
          "Error parsing query string or fetching job postings:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };
    _fetch();
  }, [jobPostingFilterQueries]);

  useEffect(() => {
    const filteredJobPostings = searchResultJobPostingList.filter(
      (jobPosting) =>
        jobPosting.postingTitle
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        jobPosting.storeName.toLowerCase().includes(filterText.toLowerCase()),
    );

    setFilteredJobPostingList(filteredJobPostings);
  }, [searchResultJobPostingList, filterText]);

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  return (
    <Container>
      <SearchResultHeader count={filteredJobPostingList.length} />
      <SearchFilterInput text={filterText} onChange={handleFilterTextChange} />
      <Banner />
      {isLoading ? (
        <CenterSpinner />
      ) : (
        <ContentContainer>
          <Title>맞춤 검색 결과</Title>
          {filteredJobPostingList.map((jobPosting) => (
            <JobPostingItem key={jobPosting.id} jobPosting={jobPosting} />
          ))}
        </ContentContainer>
      )}
    </Container>
  );
}
