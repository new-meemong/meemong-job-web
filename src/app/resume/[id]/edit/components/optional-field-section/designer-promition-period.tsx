import { DesignerPromotionPeriodKeyResume } from "@/types/resume-keys";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeEditStore } from "@/stores/resume-edit-store";

const Container = styled.div``;

const DesignerPromotionPeriod = () => {
  const { designerPromotionPeriod, setDesignerPromotionPeriod } =
    useResumeEditStore((state) => ({
      designerPromotionPeriod: state.designerPromotionPeriod,
      setDesignerPromotionPeriod: state.setDesignerPromotionPeriod,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      hasInternOptionNull: state.hasInternOptionNull,
      appliedRole: state.appliedRole,
    }));
  const options = resumeOptions.designerPromotionPeriod;

  const handleSelect = (selectedOption: string | null) => {
    setDesignerPromotionPeriod(
      selectedOption as DesignerPromotionPeriodKeyResume,
    );
  };
  return (
    <Container>
      <DropDownItem label={"디자이너 승급기간"}>
        <SingleOptionList
          options={options}
          selectedOption={designerPromotionPeriod}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default DesignerPromotionPeriod;
