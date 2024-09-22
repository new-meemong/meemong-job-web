import BaseMultiSelect from "@/components/selects/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { AvailableOffDaysKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  padding-top: ${pxToVw(8)};
`;

const SelectOffDays = () => {
  const {
    availableOffDays,
    setAvailableOffDays,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const offDays = jobPostingOptions.availableOffDays;
  let hasError = false;

  if (role === "디자이너") {
    hasError = availableOffDays.length === 0 && hasDesignerOptionNull;
  } else {
    hasError = availableOffDays.length === 0 && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    setAvailableOffDays(selectedOption as AvailableOffDaysKey);
  };

  return (
    <Container>
      <BaseMultiSelect
        label="휴무 가능일"
        options={offDays}
        selectedOptions={availableOffDays}
        errorMessage="휴무 가능일을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectOffDays;
