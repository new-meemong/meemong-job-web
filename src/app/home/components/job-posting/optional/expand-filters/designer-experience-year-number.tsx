import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const DesignerExperienceYearNumber = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery
  }));

  const options = [...jobPostingOptions.designerExperienceYearNumber];

  const selectedOption =
    getJobPostingFilterQuery("designerExperienceYearNumber") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(
        `designerExperienceYearNumber=${selectedOption}`
      );
    } else {
      removeJobPostingFilterQuery("designerExperienceYearNumber");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="디자이너 경력"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default DesignerExperienceYearNumber;
