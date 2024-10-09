import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div``;

const AvailableOffDays = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery
  }));
  const options = [
    ...jobPostingOptions.availableOffDays,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOptions =
    getJobPostingFilterQuery("availableOffDays")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeJobPostingFilterQuery("availableOffDays");
      return;
    }

    const updatedOptions = selectedOptions.includes(selectedOption)
      ? selectedOptions.filter((option) => option !== selectedOption)
      : [...selectedOptions, selectedOption];

    if (updatedOptions.length > 0) {
      addJobPostingFilterQuery(`availableOffDays=${updatedOptions.join(",")}`);
    } else {
      removeJobPostingFilterQuery("availableOffDays");
    }
  };

  return (
    <Container>
      <DropdownMultiSelectItem
        label="희망 휴무"
        options={options}
        onSelect={handleSelect}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
      />
    </Container>
  );
};

export default AvailableOffDays;
