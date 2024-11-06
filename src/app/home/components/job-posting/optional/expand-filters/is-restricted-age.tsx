import OptionalSingleDropdownFilterAge from "../../../filters/base/optional-single-dropdown-filter-age";
import styled from "styled-components";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";

const Container = styled.div``;

const IsRestrictedAge = () => {
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
    { key: "false", value: "나이 무관" },
    { key: "true", value: "나이 제한" },
  ];

  const selectedIsRestrictedAgeOption =
    getJobPostingFilterQuery("isRestrictedAge") || "false";
  const selectedIsPossibleMiddleAgeOption = getJobPostingFilterQuery(
    "isPossibleMiddleAge",
  );

  const handleIsRestrictedAgeSelect = (selectedOption: string | null) => {
    console.log(selectedOption);
    if (selectedOption === "false") {
      addJobPostingFilterQuery("isRestrictedAge=false");
      removeJobPostingFilterQuery("isPossibleMiddleAge");
    } else if (selectedOption === "true") {
      addJobPostingFilterQuery("isRestrictedAge=true");
    }
  };

  const handleIsPossibleMiddleAgeSelect = (selectedOption: string | null) => {
    if (selectedOption === "true") {
      addJobPostingFilterQuery("isPossibleMiddleAge=true");
    } else if (selectedOption === "false") {
      addJobPostingFilterQuery("isPossibleMiddleAge=false");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilterAge
        label="나이"
        options={options}
        onSelect={handleIsRestrictedAgeSelect}
        selectedOption={selectedIsRestrictedAgeOption}
        selectedSubOption={selectedIsPossibleMiddleAgeOption}
        onSelectSubOption={handleIsPossibleMiddleAgeSelect}
      />
    </Container>
  );
};

export default IsRestrictedAge;
