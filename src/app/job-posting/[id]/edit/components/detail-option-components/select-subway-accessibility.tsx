import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SubwayAccessibilityKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectSubwayAccessibility = () => {
  const {
    subwayAccessibility,
    setSubwayAccessibility,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.subwayAccessibility;
  let hasError = false;

  if (role === "디자이너") {
    hasError = subwayAccessibility === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = subwayAccessibility === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectSubwayAccessibility;
