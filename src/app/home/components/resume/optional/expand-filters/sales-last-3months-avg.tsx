import styled from "styled-components";
import OptionalDropdownFilter from "../../../filters/base/optional-dropdown-filter";
import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";

const Container = styled.div``;

const SalesLast3MonthsAvg = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));
  const options = [
    ...resumeOptions.salesLast3MonthsAvg,
    { key: "상관없음", value: "상관없음" }
  ];
  const selectedOption =
    getResumeFilterQuery("salesLast3MonthsAvg") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`salesLast3MonthsAvg=${selectedOption}`);
    } else {
      removeResumeFilterQuery("salesLast3MonthsAvg");
    }
  };

  return (
    <Container>
      <OptionalDropdownFilter
        label="이전 3개월 평균 매출"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default SalesLast3MonthsAvg;
