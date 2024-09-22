import BaseMultiSelect from "@/components/selects/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { DesignerLicensesKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectDesignerLicense = () => {
  const {
    designerLicenses,
    setDesignerLicenses,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const licenses = jobPostingOptions.designerLicenses;

  let hasError = false;

  if (role === "디자이너") {
    hasError = designerLicenses.length === 0 && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = designerLicenses.length === 0 && hasInternOptionNull;
  }

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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectDesignerLicense;
