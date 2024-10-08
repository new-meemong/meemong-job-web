import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const IsPreferredDormitorySupport = () => {
  const {
    getResumeFilterQuery,
    addResumeFilterQuery,
    removeResumeFilterQuery
  } = useResumeListStore((state) => ({
    getResumeFilterQuery: state.getResumeFilterQuery,
    addResumeFilterQuery: state.addResumeFilterQuery,
    removeResumeFilterQuery: state.removeResumeFilterQuery
  }));
  const options = [
    { key: "유", value: "유" },
    { key: "무", value: "무" },
    { key: "상관없음", value: "상관없음" }
  ];
  const selectedOption =
    getResumeFilterQuery("isPreferredDormitorySupport") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`isPreferredDormitorySupport=${selectedOption}`);
    } else {
      removeResumeFilterQuery("isPreferredDormitorySupport");
    }
  };
  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="기숙사"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default IsPreferredDormitorySupport;
