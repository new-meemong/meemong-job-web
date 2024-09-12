import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { AdminAgeKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectAdminAge = () => {
  const { adminAge, setAdminAge } = useJobPostingEditStore();
  const options = jobPostingOptions.adminAge;

  const handleSelect = (selectedOption: string) => {
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
        isError={false}
      />
    </Container>
  );
};

export default SelectAdminAge;
