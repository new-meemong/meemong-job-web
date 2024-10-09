import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import styled from "styled-components";
import { jobPostingOptions } from "@/types/job-posting-options";
import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";

const Container = styled.div``;

const MonthlyEducationCountDesigner = () => {
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
    ...jobPostingOptions.monthlyEducationDesignerCount,
    { key: "상관없음", value: "상관없음" }
  ];
  const selectedOption =
    getJobPostingFilterQuery("monthlyEducationCount") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`monthlyEducationCount=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("monthlyEducationCount");
    }
  };
  return (
    <Container>
      <DropdownSingleSelectItem
        label="교육"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default MonthlyEducationCountDesigner;
