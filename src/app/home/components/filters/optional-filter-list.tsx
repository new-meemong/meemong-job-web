import ArrowDownPurpleIcon from "@/components/icons/arrow-down-purple-icon";
import TextGreyText4Bold14 from "@/components/texts/text-grey-text4-bold-14";
import TextPrimaryBold14 from "@/components/texts/text-primary-bold-14";
import { colors } from "@/styles/colors";
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
