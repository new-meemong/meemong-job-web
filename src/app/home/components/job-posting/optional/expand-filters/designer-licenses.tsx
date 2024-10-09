import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";
import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";

const Container = styled.div``;

const DesignerLicenses = () => {
  const {
    getJobPostingFilterQuery,
    addJobPostingFilterQuery,
    removeJobPostingFilterQuery
  } = useJobPostingListStore((state) => ({
    getJobPostingFilterQuery: state.getJobPostingFilterQuery,
    addJobPostingFilterQuery: state.addJobPostingFilterQuery,
    removeJobPostingFilterQuery: state.removeJobPostingFilterQuery
  }));
  const options = jobPostingOptions.designerLicenses;
  const selectedOptions =
    getJobPostingFilterQuery("designerLicenses")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeJobPostingFilterQuery("designerLicenses");
    } else {
      let updatedOptions;

      if (selectedOptions.includes(selectedOption)) {
        updatedOptions = selectedOptions.filter(
          (option) => option !== selectedOption
        );
      } else {
        updatedOptions = [...selectedOptions, selectedOption];
      }

      if (updatedOptions.length > 0) {
        addJobPostingFilterQuery(
          `designerLicenses=${updatedOptions.join(",")}`
        );
      } else {
        removeJobPostingFilterQuery("designerLicenses");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter
        label="미용 라이센스 소유"
        options={options}
        onSelect={handleSelect}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
      />
    </Container>
  );
};

export default DesignerLicenses;
