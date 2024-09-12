import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SubwayAccessibilityKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectSubwayAccessibility = () => {
  const { subwayAccessibility, setSubwayAccessibility } =
    useJobPostingEditStore();
  const options = jobPostingOptions.subwayAccessibility;

  const handleSelect = (selectedOption: string) => {
    setSubwayAccessibility(selectedOption as SubwayAccessibilityKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="지하철 접근성"
        options={options}
        selectedOption={subwayAccessibility}
        onSelect={handleSelect}
        errorMessage="지하철 접근성을 선택해주세요."
        isError={false}
      />
    </Container>
  );
};

export default SelectSubwayAccessibility;
