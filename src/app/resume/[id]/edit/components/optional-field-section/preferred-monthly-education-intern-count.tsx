import DropDownItem from "./base/drop-down-item";
import { PreferredMonthlyEducationInternCountKeyResume } from "@/types/resume-keys";
import SingleOptionList from "./base/single-option-list";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const PreferredMonthlyEducationInternCount = () => {
  const {
    preferredMonthlyEducationInternCount,
    setPreferredMonthlyEducationInternCount,
  } = useResumeEditStore((state) => ({
    preferredMonthlyEducationInternCount:
      state.preferredMonthlyEducationInternCount,
    setPreferredMonthlyEducationInternCount:
      state.setPreferredMonthlyEducationInternCount,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
  }));
  const options = resumeOptions.preferredMonthlyEducationInternCount;

  const handleSelect = (selectedOption: string | null) => {
    setPreferredMonthlyEducationInternCount(
      selectedOption as PreferredMonthlyEducationInternCountKeyResume,
    );
  };

  return (
    <Container>
      <DropDownItem label={"희망 교육"}>
        <SingleOptionList
          options={options}
          selectedOption={preferredMonthlyEducationInternCount}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default PreferredMonthlyEducationInternCount;
