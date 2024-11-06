import OptionalMultiDropdownFilter from "../../../filters/base/optional-multi-dropdown-filter";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div``;

const CompletedEducationLevels = () => {
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
    { key: "미용고등학교 졸업", value: "미용고등학교 졸업" },
    { key: "미용대학교 졸업", value: "미용대학교 졸업" },
    { key: "일반고등학교 졸업", value: "일반고등학교 졸업" },
    { key: "일반대학교 졸업", value: "일반대학교 졸업" },
    { key: "상관없음", value: "상관없음" },
  ];
  const selectedOptions =
    getResumeFilterQuery("completedEducationLevels")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeResumeFilterQuery("completedEducationLevels");
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
        addResumeFilterQuery(
          `completedEducationLevels=${updatedOptions.join(",")}`,
        );
      } else {
        removeResumeFilterQuery("completedEducationLevels");
      }
    }
  };

  return (
    <Container>
      <OptionalMultiDropdownFilter
        label="학력"
        options={options}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
        onSelect={handleSelect}
      />
    </Container>
  );
};

export default CompletedEducationLevels;
