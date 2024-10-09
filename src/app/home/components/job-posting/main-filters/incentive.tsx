import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div``;

const Incentive = () => {
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
    ...jobPostingOptions.incentive,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption = getJobPostingFilterQuery("incentive") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`incentive=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("incentive");
    }
  };
  return (
    <Container>
      <DropdownSingleSelectItem
        label="인센티브"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
        tooltip={`월 매출 1,000만원 시\n지급되는 인센티브를 뜻합니다.`}
      />
    </Container>
  );
};

export default Incentive;
