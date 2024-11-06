import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div``;

const WorkCycleTypes = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery,
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery,
  }));
  const options = [
    ...resumeOptions.workCycleTypes,
    { key: "상관없음", value: "상관없음" },
  ];
  const selectedOptions =
    getResumeFilterQuery("workCycleTypes")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeResumeFilterQuery("workCycleTypes");
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
        addResumeFilterQuery(`workCycleTypes=${updatedOptions.join(",")}`);
      } else {
        removeResumeFilterQuery("workCycleTypes");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter<string>
        label="근무 주기"
        options={options}
        onSelect={handleSelect}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
      />
    </Container>
  );
};

export default WorkCycleTypes;
