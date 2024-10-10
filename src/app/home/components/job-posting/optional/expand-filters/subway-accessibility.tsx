import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const SubwayAccessibility = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery
  }));

  const options = [
    {
      key: "3분 이하",
      value: "3분 이하"
    },
    {
      key: "5분 이하",
      value: "5분 이하"
    },
    {
      key: "15분 이하",
      value: "15분 이하"
    },
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption =
    getJobPostingFilterQuery("subwayAccessibility") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`subwayAccessibility=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("subwayAccessibility");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="지하철 접근성"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default SubwayAccessibility;
