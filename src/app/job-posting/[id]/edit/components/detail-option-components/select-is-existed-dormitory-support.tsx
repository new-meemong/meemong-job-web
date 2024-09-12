import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedDormitorySupport = () => {
  const { isExistedDormitorySupport, setIsExistedDormitorySupport } =
    useJobPostingEditStore();
  const options = jobPostingOptions.isExistedDormitorySupport;

  const handleSelect = (selectedOption: boolean) => {
    setIsExistedDormitorySupport(selectedOption);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="기숙사"
        options={options}
        selectedOption={isExistedDormitorySupport}
        onSelect={handleSelect}
        errorMessage="기숙사 지원 여부를 선택해주세요."
        isError={false}
      />
    </Container>
  );
};

export default SelectIsExistedDormitorySupport;
