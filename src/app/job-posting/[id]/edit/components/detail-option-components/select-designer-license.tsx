import BaseMultiSelect from "@/components/select/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import {
  DesignerLicensesType,
  jobPostingTypes
} from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerLicense = () => {
  const { designerLicenses, setDesignerLicenses } = useJobPostingEditStore();
  const licenses = Object.entries(jobPostingTypes.designerLicenses).map(
    ([key, value]) => ({
      key,
      value
    })
  );

  const handleSelect = (selectedOption: string) => {
    const selectedKey = Object.entries(jobPostingTypes.designerLicenses).find(
      ([key, value]) => key === selectedOption
    )?.[0];
    setDesignerLicenses(selectedKey as DesignerLicensesType);
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
