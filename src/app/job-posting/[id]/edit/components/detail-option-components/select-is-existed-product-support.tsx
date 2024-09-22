import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedProductSupport = () => {
  const {
    isExistedProductSupport,
    setIsExistedProductSupport,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedProductSupport;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedProductSupport === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedProductSupport === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedProductSupport(selectedOption);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="시술제품 지원"
        options={options}
        selectedOption={isExistedProductSupport}
        onSelect={handleSelect}
        errorMessage={"시술제품 지원 여부를 선택해주세요."}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedProductSupport;
