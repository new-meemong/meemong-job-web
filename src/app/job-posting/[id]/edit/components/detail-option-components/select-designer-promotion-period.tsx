import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { DesignerPromitionPeriodKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerPromitionPeriod = () => {
  const { designerPromitionPeriod, setDesignerPromitionPeriod } =
    useJobPostingEditStore();
  const options = jobPostingOptions.designerPromitionPeriod;

  const handleSelect = (selectedOption: string) => {
    setDesignerPromitionPeriod(selectedOption as DesignerPromitionPeriodKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="디자이너 승급기간"
        options={options}
        selectedOption={designerPromitionPeriod}
        errorMessage="디자이너 승급기간을 선택해주세요."
        onSelect={handleSelect}
        isError={false}
        description="개인차가 있을 수 있습니다"
      />
    </Container>
  );
};

export default SelectDesignerPromitionPeriod;
