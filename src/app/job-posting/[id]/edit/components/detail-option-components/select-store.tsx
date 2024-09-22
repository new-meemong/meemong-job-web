import BaseMultiSelect from "@/components/selects/base-multi-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { StoreKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectStore = () => {
  const { store, setStore, hasDesignerOptionNull, hasInternOptionNull, role } =
    useJobPostingEditStore();
  const stores = jobPostingOptions.store;
  let hasError = false;

  if (role === "디자이너") {
    hasError = store.length === 0 && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = store.length === 0 && hasInternOptionNull;
  }

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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectStore;
