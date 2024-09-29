import { useResumeEditStore } from "@/stores/resume-edit-store";
import { DesignerPromotionPeriodKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";

const Container = styled.div``;

const DesignerPromotionPeriod = () => {
  const {
    designerPromotionPeriod,
    setDesignerPromotionPeriod,
    hasDesignerOptionNull,
    hasInternOptionNull,
    appliedRole
  } = useResumeEditStore((state) => ({
    designerPromotionPeriod: state.designerPromotionPeriod,
    setDesignerPromotionPeriod: state.setDesignerPromotionPeriod,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    appliedRole: state.appliedRole
  }));
  const options = resumeOptions.designerPromotionPeriod;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !designerPromotionPeriod && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !designerPromotionPeriod && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setDesignerPromotionPeriod(
      selectedOption as DesignerPromotionPeriodKeyResume
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
