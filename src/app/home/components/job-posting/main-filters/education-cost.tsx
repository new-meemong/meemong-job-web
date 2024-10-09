import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div``;

const EducationCost = () => {
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
    ...jobPostingOptions.educationCost,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption =
    getJobPostingFilterQuery("educationCost") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`educationCost=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("educationCost");
    }
  };

  return (
    <Container>
      <DropdownSingleSelectItem
        label="교육비"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default EducationCost;
