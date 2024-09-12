import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedTowelSupplier = () => {
  const { isExistedTowelSupplier, setIsExistedTowelSupplier } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedTowelSupplier;

  const handleSelect = (selectedOption: boolean) => {
    setIsExistedTowelSupplier(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="수건 업체"
        options={options}
        selectedOption={isExistedTowelSupplier}
        errorMessage="수건 업체 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectIsExistedTowelSupplier;
