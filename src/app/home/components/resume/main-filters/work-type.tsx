import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div``;

const WorkType = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery,
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery,
  }));
  const options = resumeOptions.workType;

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`workType=${selectedOption}`);
    } else {
      removeResumeFilterQuery("workType");
    }
  };

  return (
    <Container>
      <DropdownSingleSelectItem
        label="근무 형태"
        options={options}
        onSelect={handleSelect}
        selectedOption={getResumeFilterQuery("workType") || "상관없음"}
      />
    </Container>
  );
};

export default WorkType;
