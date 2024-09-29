import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";

const Container = styled.div``;

const IsPreferredDormitorySupport = () => {
  const {
    isPreferredDormitorySupport,
    setIsPreferredDormitorySupport,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    isPreferredDormitorySupport: state.isPreferredDormitorySupport,
    setIsPreferredDormitorySupport: state.setIsPreferredDormitorySupport,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));
  const options = resumeOptions.isPreferredDormitorySupport;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !isPreferredDormitorySupport && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !isPreferredDormitorySupport && hasInternOptionNull;
  }

  return (
    <Container>
      <DropDownItem label={"기숙사 지원"}>
        <SingleOptionList
          options={options}
          selectedOption={isPreferredDormitorySupport}
          onSelect={setIsPreferredDormitorySupport}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default IsPreferredDormitorySupport;
