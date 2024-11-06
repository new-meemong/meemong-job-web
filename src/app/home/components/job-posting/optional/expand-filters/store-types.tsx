import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const StoreTypes = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery,
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery,
  }));

  const options = [
    {
      key: `소형샵 (25평 이하)`,
      value: `소형샵\n(25평 이하)`,
    },
    {
      key: `중형샵 (60평 이하)`,
      value: `중형샵\n(60평 이하)`,
    },
    {
      key: `대형샵 (60평 이상)`,
      value: `대형샵\n(60평 이상)`,
    },
    {
      key: `남성전문 (맨즈살롱/바버샵)`,
      value: `남성전문\n(맨즈살롱/바버샵)`,
    },
    {
      key: `공유미용실`,
      value: `공유미용실`,
    },
    { key: "상관없음", value: "상관없음" },
  ];

  const selectedOptions =
    getJobPostingFilterQuery("storeTypes")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeJobPostingFilterQuery("storeTypes");
    } else {
      let updatedOptions;

      if (selectedOptions.includes(selectedOption)) {
        updatedOptions = selectedOptions.filter(
          (option) => option !== selectedOption,
        );
      } else {
        updatedOptions = [...selectedOptions, selectedOption];
      }

      if (updatedOptions.length > 0) {
        addJobPostingFilterQuery(`storeTypes=${updatedOptions.join(",")}`);
      } else {
        removeJobPostingFilterQuery("storeTypes");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter
        label="매장 형태"
        options={options}
        onSelect={handleSelect}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
      />
    </Container>
  );
};

export default StoreTypes;
