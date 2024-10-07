import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";

const Container = styled.div``;

const DesignerExperienceYearNumber = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));
  const options = resumeOptions.designerExperienceYearNumber;

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`designerExperienceYearNumber=${selectedOption}`);
    } else {
      removeResumeFilterQuery("designerExperienceYearNumber");
    }
  };
  return (
    <Container>
      <DropdownSingleSelectItem
        label="경력"
        options={options}
        onSelect={handleSelect}
        selectedOption={
          getResumeFilterQuery("designerExperienceYearNumber") || "상관없음"
        }
      />
    </Container>
  );
};

export default DesignerExperienceYearNumber;
