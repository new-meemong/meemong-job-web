import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const SalesLast3MonthsAvg = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery,
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery,
  }));

  const options = [...jobPostingOptions.salesLast3MonthsAvg];

  const selectedOption =
    getJobPostingFilterQuery("salesLast3MonthsAvg") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`salesLast3MonthsAvg=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("salesLast3MonthsAvg");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="이전 매장 평균 매출"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default SalesLast3MonthsAvg;
