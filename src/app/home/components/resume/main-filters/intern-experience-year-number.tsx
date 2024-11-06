import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div``;

const InternExperienceYearNumber = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery,
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery,
  }));
  const options = [
    ...resumeOptions.internExperienceYearNumber,
    { key: "상관없음", value: "상관없음" },
  ];

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`internExperienceYearNumber=${selectedOption}`);
    } else {
      removeResumeFilterQuery("internExperienceYearNumber");
    }
  };
  return (
    <Container>
      <DropdownSingleSelectItem
        label="경력"
        options={options}
        onSelect={handleSelect}
        selectedOption={
          getResumeFilterQuery("internExperienceYearNumber") || "상관없음"
        }
      />
    </Container>
  );
};

export default InternExperienceYearNumber;
