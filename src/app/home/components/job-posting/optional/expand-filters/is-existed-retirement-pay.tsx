import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const IsExistedRetirementPay = () => {
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
    { key: "true", value: "있음" },
    { key: "false", value: "없음" },
    { key: "상관없음", value: "상관없음" },
  ];

  const selectedOption =
    getJobPostingFilterQuery("isExistedRetirementPay") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`isExistedRetirementPay=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("isExistedRetirementPay");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="퇴직금"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default IsExistedRetirementPay;
