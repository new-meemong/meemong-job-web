import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedCleaningSupplier = () => {
  const { isExistedCleaningSupplier, setIsExistedCleaningSupplier } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedCleaningSupplier;

  const handleSelect = (selectedOption: boolean) => {
    setIsExistedCleaningSupplier(selectedOption);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="청소 업체"
        options={options}
        selectedOption={isExistedCleaningSupplier}
        errorMessage="청소 업체 여부를 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectIsExistedCleaningSupplier;
