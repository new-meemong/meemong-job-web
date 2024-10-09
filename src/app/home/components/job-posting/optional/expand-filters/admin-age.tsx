import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const AdminAge = () => {
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
    ...jobPostingOptions.adminAge,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption = getJobPostingFilterQuery("adminAge") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`adminAge=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("adminAge");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="관리자 나이"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default AdminAge;
