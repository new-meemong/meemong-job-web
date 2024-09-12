import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectStoreInteriorRenovationAgo = () => {
  const { storeInteriorRenovationAgo, setStoreInteriorRenovationAgo } =
    useJobPostingEditStore();
  const options = jobPostingOptions.storeInteriorRenovationAgo;

  return (
    <Container>
      <BaseSingleSelect
        label="매장 인테리어"
        options={options}
        selectedOption={storeInteriorRenovationAgo}
        errorMessage="매장 인테리어를 선택해주세요."
        onSelect={setStoreInteriorRenovationAgo}
        isError={false}
      />
    </Container>
  );
};

export default SelectStoreInteriorRenovationAgo;
