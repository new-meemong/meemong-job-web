import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const DesignerPromotionPeriod = () => {
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
    ...jobPostingOptions.designerPromotionPeriod,
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOption =
    getJobPostingFilterQuery("designerPromotionPeriod") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "무관" ? null : selectedOption;
    if (selectedOption) {
      addJobPostingFilterQuery(`designerPromotionPeriod=${selectedOption}`);
    } else {
      removeJobPostingFilterQuery("designerPromotionPeriod");
    }
  };

  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="디자이너 승급기간"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
        caption={"개인차가 있을 수 있습니다."}
      />
    </Container>
  );
};

export default DesignerPromotionPeriod;
