import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";

const Container = styled.div``;

const PreferredOffDays = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));
  const options = resumeOptions.preferredOffDays;
  const selectedOptions =
    getResumeFilterQuery("preferredOffDays")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeResumeFilterQuery("preferredOffDays");
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
        addResumeFilterQuery(`preferredOffDays=${updatedOptions.join(",")}`);
      } else {
        removeResumeFilterQuery("preferredOffDays");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter
        label="희망 휴무일"
        options={options}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
        onSelect={handleSelect}
      />
    </Container>
  );
};

export default PreferredOffDays;
