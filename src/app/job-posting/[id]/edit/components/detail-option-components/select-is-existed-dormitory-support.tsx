import BaseSingleSelect from "@/components/selects/base-single-select";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsExistedDormitorySupport = () => {
  const {
    isExistedDormitorySupport,
    setIsExistedDormitorySupport,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isExistedDormitorySupport;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isExistedDormitorySupport === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = isExistedDormitorySupport === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: boolean | null) => {
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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectIsExistedDormitorySupport;
