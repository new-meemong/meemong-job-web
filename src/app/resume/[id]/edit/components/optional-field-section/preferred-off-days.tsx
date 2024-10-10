import { useResumeEditStore } from "@/stores/resume-edit-store";
import { PreferredOffDaysKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import MultiOptionList from "./base/multi-option-list";

const Container = styled.div``;

const PreferredOffDays = () => {
  const { preferredOffDays, setPreferredOffDays } = useResumeEditStore(
    (state) => ({
      preferredOffDays: state.preferredOffDays,
      setPreferredOffDays: state.setPreferredOffDays,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull,
      appliedRole: state.appliedRole
    })
  );

  const options = resumeOptions.preferredOffDays;

  const handleSelect = (selectedOption: string) => {
    setPreferredOffDays(selectedOption as PreferredOffDaysKeyResume);
  };

  return (
    <Container>
      <DropDownItem label={"희망 휴무일(중복 가능)"}>
        <MultiOptionList
          options={options}
          selectedOptions={preferredOffDays}
          onSelect={handleSelect}
          buttonSize="small"
        />
      </DropDownItem>
    </Container>
  );
};

export default PreferredOffDays;
