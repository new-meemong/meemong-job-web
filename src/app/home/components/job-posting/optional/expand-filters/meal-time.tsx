import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const MealTime = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery,
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery,
  }));

  const options = [
    ...jobPostingOptions.mealTime,
    { key: "상관없음", value: "상관없음" },
  ];

  const selectedOption = getJobPostingFilterQuery("mealTime") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`mealTime=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("mealTime");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="식사 시간"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default MealTime;
