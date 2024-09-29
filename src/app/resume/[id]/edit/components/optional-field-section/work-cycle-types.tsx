import { useResumeEditStore } from "@/stores/resume-edit-store";
import {
  PreferredOffDaysKeyResume,
  WorkCycleTypesKeyResume,
  WorkTypeKeyResume
} from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import MultiOptionList from "./base/multi-option-list";

const Container = styled.div``;

const WorkCycleTypes = () => {
  const {
    workCycleTypes,
    setWorkCycleTypes,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    workCycleTypes: state.workCycleTypes,
    setWorkCycleTypes: state.setWorkCycleTypes,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));

  const options = resumeOptions.workCycleTypes;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !workCycleTypes && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !workCycleTypes && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    setWorkCycleTypes(selectedOption as WorkCycleTypesKeyResume);
  };

  return (
    <Container>
      <DropDownItem label={"근무 주기(중복 가능)"}>
        <MultiOptionList
          options={options}
          selectedOptions={workCycleTypes}
          onSelect={handleSelect}
          buttonSize="small"
        />
      </DropDownItem>
    </Container>
  );
};

export default WorkCycleTypes;
