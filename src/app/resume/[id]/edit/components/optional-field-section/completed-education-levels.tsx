import { useResumeEditStore } from "@/stores/resume-edit-store";
import { CompletedEducationLevelsKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import MultiOptionList from "./base/multi-option-list";

const Container = styled.div``;

const CompletedEducationLevels = () => {
  const { completedEducationLevels, setCompletedEducationLevels } =
    useResumeEditStore((state) => ({
      completedEducationLevels: state.completedEducationLevels,
      setCompletedEducationLevels: state.setCompletedEducationLevels,
      appliedRole: state.appliedRole,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull
    }));
  const options = resumeOptions.completedEducationLevels;

  const handleSelect = (selectedOption: string) => {
    setCompletedEducationLevels(
      selectedOption as CompletedEducationLevelsKeyResume
    );
  };
  return (
    <Container>
      <DropDownItem label={"학력"}>
        <MultiOptionList
          options={options}
          selectedOptions={completedEducationLevels}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default CompletedEducationLevels;
