import BaseSingleSelect from "@/components/selects/base-single-select";
import { DesignerPromotionPeriodKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerPromotionPeriod = () => {
  const {
    designerPromotionPeriod,
    setDesignerPromotionPeriod,
    hasInternOptionNull,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.designerPromotionPeriod;
  const hasError = designerPromotionPeriod === null && hasInternOptionNull;

  const handleSelect = (selectedOption: string | null) => {
    setDesignerPromotionPeriod(selectedOption as DesignerPromotionPeriodKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="인턴기간 · 승급 포함"
        options={options}
        selectedOption={designerPromotionPeriod}
        errorMessage="디자이너 승급기간을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
        description="개인차가 있을 수 있습니다"
      />
    </Container>
  );
};

export default SelectDesignerPromotionPeriod;
