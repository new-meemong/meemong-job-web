import { useResumeEditStore } from "@/stores/resume-edit-store";
import { CompletedEducationLevelKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import OptionList from "./base/single-option-list";

const Container = styled.div``;

const CompletedEducationLevel = () => {
  const { completedEducationLevel, setCompletedEducationLevel } =
    useResumeEditStore((state) => ({
      completedEducationLevel: state.completedEducationLevel,
      setCompletedEducationLevel: state.setCompletedEducationLevel,
      appliedRole: state.appliedRole,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull
    }));
  const options = resumeOptions.completedEducationLevel;

  const handleSelect = (selectedOption: string | null) => {
    setCompletedEducationLevel(
      selectedOption as CompletedEducationLevelKeyResume
    );
  };
  return (
    <Container>
      <DropDownItem label={"학력"}>
        <OptionList
          options={options}
          selectedOption={completedEducationLevel}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default CompletedEducationLevel;
