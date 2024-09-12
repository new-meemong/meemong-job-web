import BaseMultiSelect from "@/components/select/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { DesignerLicensesKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerLicense = () => {
  const { designerLicenses, setDesignerLicenses } = useJobPostingEditStore();
  const licenses = jobPostingOptions.designerLicenses;

  const handleSelect = (selectedOption: string) => {
    setDesignerLicenses(selectedOption as DesignerLicensesKey);
  };

  return (
    <Container>
      <BaseMultiSelect
        label="미용 라이센스 (중복 가능)"
        options={licenses}
        selectedOptions={designerLicenses}
        errorMessage="라이센스을 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectDesignerLicense;
