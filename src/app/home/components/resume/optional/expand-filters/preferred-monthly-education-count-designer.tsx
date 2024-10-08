import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const PreferredMonthlyEducationCountDesigner = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));
  const options = resumeOptions.preferredMonthlyEducationDesignerCount;
  const selectedOption =
    getResumeFilterQuery("preferredMonthlyEducationCount") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`preferredMonthlyEducationCount=${selectedOption}`);
    } else {
      removeResumeFilterQuery("preferredMonthlyEducationCount");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="희망 교육"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default PreferredMonthlyEducationCountDesigner;
