import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { StoreInteriorRenovationAgoKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectStoreInteriorRenovationAgo = () => {
  const {
    storeInteriorRenovationAgo,
    setStoreInteriorRenovationAgo,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.storeInteriorRenovationAgo;
  let hasError = false;

  if (role === "디자이너") {
    hasError = storeInteriorRenovationAgo === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = storeInteriorRenovationAgo === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setStoreInteriorRenovationAgo(
      selectedOption as StoreInteriorRenovationAgoKey
    );
  };

  return (
    <Container>
      <BaseSingleSelect
        label="매장 인테리어"
        options={options}
        selectedOption={storeInteriorRenovationAgo}
        errorMessage="매장 인테리어를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectStoreInteriorRenovationAgo;
