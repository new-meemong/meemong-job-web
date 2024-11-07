import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const Age = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery,
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery,
  }));

  const options = jobPostingOptions.age;

  const selectedOption = getJobPostingFilterQuery("age") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    if (selectedOption) {
      addJobPostingFilterQuery(`age=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("age");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="나이"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default Age;
