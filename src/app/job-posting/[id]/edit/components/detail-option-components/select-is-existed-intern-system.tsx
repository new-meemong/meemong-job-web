import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { isExistedInternSystemKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedInternSystem = () => {
  const { isExistedInternSystem, setIsExistedInternSystem } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedInternSystem;

  const handleSelect = (selectedOption: boolean) => {
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
        isError={false}
        buttonSize={"small"}
      />
    </Container>
  );
};

export default SelectIsExistedInternSystem;
