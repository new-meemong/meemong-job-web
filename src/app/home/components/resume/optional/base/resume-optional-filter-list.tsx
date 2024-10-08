import styled from "styled-components";
import ResumeOptionalFilterExpand from "./resume-optional-filter-expand";
import ResumeOptionalFilterUnexpand from "./resume-optional-filter-unexpand";
import { useState } from "react";

const Container = styled.div``;

const ResumeOptionalFilterList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const resetFilters = () => {};

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
