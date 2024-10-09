import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const IsExistedFourInsurances = () => {
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
    { key: "true", value: "유" },
    { key: "false", value: "무" },
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption =
    getJobPostingFilterQuery("isExistedFourInsurances") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`isExistedFourInsurances=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("isExistedFourInsurances");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="4대 보험"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default IsExistedFourInsurances;
