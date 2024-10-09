import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";

const Container = styled.div``;

const WorkCycleTypes = () => {
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
    ...jobPostingOptions.workCycleTypes,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOptions =
    getJobPostingFilterQuery("workCycleTypes")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeJobPostingFilterQuery("workCycleTypes");
    } else {
      let updatedOptions;

      if (selectedOptions.includes(selectedOption)) {
        updatedOptions = selectedOptions.filter(
          (option) => option !== selectedOption
        );
      } else {
        updatedOptions = [...selectedOptions, selectedOption];
      }

      if (updatedOptions.length > 0) {
        addJobPostingFilterQuery(`workCycleTypes=${updatedOptions.join(",")}`);
      } else {
        removeJobPostingFilterQuery("workCycleTypes");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter
        label="근무 주기"
        options={options}
        onSelect={handleSelect}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
      />
    </Container>
  );
};

export default WorkCycleTypes;
