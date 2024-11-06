import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const Sex = () => {
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
    { key: "남자", value: "남자" },
    { key: "여자", value: "여자" },
    { key: "무관", value: "무관" },
  ];

  const selectedOption = getJobPostingFilterQuery("sex") || "무관";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "무관" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`sex=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("sex");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="성별"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default Sex;
