import { AdminAgeKey } from "@/types/job-posting-keys";
import BaseSingleSelect from "@/components/selects/base-single-select";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectAdminAge = () => {
  const {
    adminAge,
    setAdminAge,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.adminAge;
  let hasError = false;

  if (role === "디자이너") {
    hasError = adminAge === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = adminAge === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setAdminAge(selectedOption as AdminAgeKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="관리자 나이"
        options={options}
        selectedOption={adminAge}
        onSelect={handleSelect}
        errorMessage="관리자 나이를 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default SelectAdminAge;
