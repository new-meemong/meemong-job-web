import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";

const Container = styled.div``;

const IsPreferredParking = () => {
  const {
    isPreferredParking,
    setIsPreferredParking,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    isPreferredParking: state.isPreferredParking,
    setIsPreferredParking: state.setIsPreferredParking,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));
  const options = resumeOptions.isPreferredParking;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !isPreferredParking && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !isPreferredParking && hasInternOptionNull;
  }

  return (
    <Container>
      <DropDownItem label={"주차 희망 여부"}>
        <SingleOptionList
          options={options}
          selectedOption={isPreferredParking}
          onSelect={setIsPreferredParking}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default IsPreferredParking;
