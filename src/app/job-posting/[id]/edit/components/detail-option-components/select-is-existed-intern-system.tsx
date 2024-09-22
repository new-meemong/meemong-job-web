import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { isExistedInternSystemKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedInternSystem = () => {
  const {
    isExistedInternSystem,
    setIsExistedInternSystem,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedInternSystem;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedInternSystem === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedInternSystem === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
    setIsExistedInternSystem(selectedOption as isExistedInternSystemKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="인턴배정 시스템"
        options={options}
        selectedOption={isExistedInternSystem}
        errorMessage="인턴배정 시스템을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
        buttonSize={"small"}
      />
    </Container>
  );
};

export default SelectIsExistedInternSystem;
