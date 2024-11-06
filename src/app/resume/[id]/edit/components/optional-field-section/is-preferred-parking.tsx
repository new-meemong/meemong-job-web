import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const IsPreferredParking = () => {
  const { isPreferredParking, setIsPreferredParking } = useResumeEditStore(
    (state) => ({
      isPreferredParking: state.isPreferredParking,
      setIsPreferredParking: state.setIsPreferredParking,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull,
      appliedRole: state.appliedRole,
    }),
  );
  const options = resumeOptions.isPreferredParking;

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
