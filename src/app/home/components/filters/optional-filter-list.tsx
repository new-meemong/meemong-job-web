import styled from "styled-components";
import OptionalFilterExpand from "./options-filters/optional-filter-expand";
import { useState } from "react";
import OptionalFilterUnexpand from "./options-filters/optional-filter-unexpand";

const Container = styled.div``;

const OptionalFilterList = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const resetFilters = () => {};

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Container>
      {isExpanded ? (
        <OptionalFilterExpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      ) : (
        <OptionalFilterUnexpand
          resetFilters={resetFilters}
          toggleExpanded={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default OptionalFilterList;
