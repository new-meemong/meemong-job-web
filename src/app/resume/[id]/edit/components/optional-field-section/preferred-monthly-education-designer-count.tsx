import DropDownItem from "./base/drop-down-item";
import { PreferredMonthlyEducationDesignerCountKeyResume } from "@/types/resume-keys";
import SingleOptionList from "./base/single-option-list";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const PreferredMonthlyEducationDesignerCount = () => {
  const {
    preferredMonthlyEducationDesignerCount,
    setPreferredMonthlyEducationDesignerCount,
  } = useResumeEditStore((state) => ({
    preferredMonthlyEducationDesignerCount:
      state.preferredMonthlyEducationDesignerCount,
    setPreferredMonthlyEducationDesignerCount:
      state.setPreferredMonthlyEducationDesignerCount,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
  }));
  const options = resumeOptions.preferredMonthlyEducationDesignerCount;

  const handleSelect = (selectedOption: string | null) => {
    setPreferredMonthlyEducationDesignerCount(
      selectedOption as PreferredMonthlyEducationDesignerCountKeyResume,
    );
  };

  return (
    <Container>
      <DropDownItem label={"희망 교육"}>
        <SingleOptionList
          options={options}
          selectedOption={preferredMonthlyEducationDesignerCount}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default PreferredMonthlyEducationDesignerCount;
