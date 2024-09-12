import BaseMultiSelect from "@/components/select/base-multi-select";
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
  const { availableOffDays, setAvailableOffDays } = useJobPostingEditStore();
  const offDays = jobPostingOptions.availableOffDays;

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
        isError={false}
      />
    </Container>
  );
};

export default SelectOffDays;
