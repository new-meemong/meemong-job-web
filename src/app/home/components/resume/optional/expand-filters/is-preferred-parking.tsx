import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";
import styled from "styled-components";
import { useResumeListStore } from "@/stores/resume-list-store";

const Container = styled.div``;

const IsPreferredParking = () => {
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
    { key: "true", value: "있음" },
    { key: "false", value: "없음" },
    { key: "상관없음", value: "상관없음" },
  ];
  const selectedOption =
    getResumeFilterQuery("isPreferredParking") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`isPreferredParking=${selectedOption}`);
    } else {
      removeResumeFilterQuery("isPreferredParking");
    }
  };
  return (
    <Container>
      <OptionalSingleDropdownFilter
        label="주차 희망 여부"
        options={options}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Container>
  );
};

export default IsPreferredParking;
