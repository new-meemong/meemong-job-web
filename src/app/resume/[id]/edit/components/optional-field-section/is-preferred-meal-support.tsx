import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const IsPreferredMealSupport = () => {
  const { isPreferredMealSupport, setIsPreferredMealSupport } =
    useResumeEditStore((state) => ({
      isPreferredMealSupport: state.isPreferredMealSupport,
      setIsPreferredMealSupport: state.setIsPreferredMealSupport,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull,
      appliedRole: state.appliedRole,
    }));
  const options = resumeOptions.isPreferredMealSupport;

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
