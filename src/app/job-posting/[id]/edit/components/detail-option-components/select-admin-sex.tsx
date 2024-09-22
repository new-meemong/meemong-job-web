import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { AdminSexKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectAdminSex = () => {
  const {
    adminSex,
    setAdminSex,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.adminSex;
  let hasError = false;

  if (role === "디자이너") {
    hasError = adminSex === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = adminSex === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setAdminSex(selectedOption as AdminSexKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="관리자 성별"
        options={options}
        selectedOption={adminSex}
        onSelect={handleSelect}
        errorMessage="관리자 성별을 선택해주세요."
        isError={hasError}
      />
    </Container>
  );
};

export default SelectAdminSex;
