import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedProductSupport = () => {
  const { isExistedProductSupport, setIsExistedProductSupport } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedProductSupport;

  const handleSelect = (selectedOption: boolean) => {
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
        isError={false}
      />
    </Container>
  );
};

export default SelectIsExistedProductSupport;
