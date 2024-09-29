import { useResumeEditStore } from "@/stores/resume-edit-store";
import { IsPreferredMealSupportKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";

const Container = styled.div``;

const IsPreferredMealSupport = () => {
  const {
    isPreferredMealSupport,
    setIsPreferredMealSupport,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    isPreferredMealSupport: state.isPreferredMealSupport,
    setIsPreferredMealSupport: state.setIsPreferredMealSupport,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));
  const options = resumeOptions.isPreferredMealSupport;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !isPreferredMealSupport && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !isPreferredMealSupport && hasInternOptionNull;
  }

  return (
    <Container>
      <DropDownItem label={"식대 지원"}>
        <SingleOptionList
          options={options}
          selectedOption={isPreferredMealSupport}
          onSelect={setIsPreferredMealSupport}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default IsPreferredMealSupport;
