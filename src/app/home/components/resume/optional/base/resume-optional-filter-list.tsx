import ResumeOptionalFilterExpand from "./resume-optional-filter-expand";
import ResumeOptionalFilterUnexpand from "./resume-optional-filter-unexpand";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";
import { useState } from "react";

const Container = styled.div``;

const ResumeOptionalFilterList = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { resetResumeFilterQueries } = useResumeListStore((state) => ({
    resetResumeFilterQueries: state.resetResumeFilterQueries,
  }));

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const resetFilters = () => {
    resetResumeFilterQueries();
  };

  return (
    <Container>
      {isExpanded ? (
        <ResumeOptionalFilterExpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      ) : (
        <ResumeOptionalFilterUnexpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default ResumeOptionalFilterList;
