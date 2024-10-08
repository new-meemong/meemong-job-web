import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import OptionalDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const CompletedEducationLevel = () => {
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
    ...resumeOptions.completedEducationLevel,
    { key: "상관없음", value: "상관없음" }
  ];
  const selectedOption =
    getResumeFilterQuery("completedEducationLevel") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`completedEducationLevel=${selectedOption}`);
    } else {
      removeResumeFilterQuery("completedEducationLevel");
    }
  };

  return (
    <Container>
      <OptionalDropdownFilter
        label="학력"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default CompletedEducationLevel;
