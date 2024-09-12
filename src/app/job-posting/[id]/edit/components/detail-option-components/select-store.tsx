import BaseMultiSelect from "@/components/select/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { StoreKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectStore = () => {
  const { store, setStore } = useJobPostingEditStore();
  const stores = jobPostingOptions.store;

  const handleSelect = (selectedOption: string) => {
    setStore(selectedOption as StoreKey);
  };

  return (
    <Container>
      <BaseMultiSelect
        label="매장 형태"
        subLabel="복수 선택, 최대 2개 가능"
        options={stores}
        selectedOptions={store}
        errorMessage="매장 형태를 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectStore;
