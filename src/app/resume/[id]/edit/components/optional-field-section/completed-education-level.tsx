import { useResumeEditStore } from "@/stores/resume-edit-store";
import { CompletedEducationLevelKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import OptionList from "./base/single-option-list";

const Container = styled.div``;

const CompletedEducationLevel = () => {
  const {
    completedEducationLevel,
    setCompletedEducationLevel,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useResumeEditStore((state) => ({
    completedEducationLevel: state.completedEducationLevel,
    setCompletedEducationLevel: state.setCompletedEducationLevel,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull
  }));
  const options = resumeOptions.completedEducationLevel;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !completedEducationLevel && hasDesignerOptionNull;
  }
  if (appliedRole === "인턴") {
    hasError = !completedEducationLevel && hasInternOptionNull;
  }

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
