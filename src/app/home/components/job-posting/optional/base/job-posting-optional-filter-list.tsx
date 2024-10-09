import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useState } from "react";
import styled from "styled-components";
import JobPostingOptionalFilterExpand from "./job-posting-optional-filter-expand";
import JobPostingOptionalFilterUnexpand from "./job-posting-optional-filter-unexpand";

const Container = styled.div``;

const JobPostingOptionalFilterList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { resetJobPostingFilterQueries } = useJobPostingListStore((state) => ({
    resetJobPostingFilterQueries: state.resetJobPostingFilterQueries
  }));

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const resetFilters = () => {
    resetJobPostingFilterQueries();
  };
  return (
    <Container>
      {isExpanded ? (
        <JobPostingOptionalFilterExpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      ) : (
        <JobPostingOptionalFilterUnexpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default JobPostingOptionalFilterList;
