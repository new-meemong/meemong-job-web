import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import { useResumeListStore } from "@/stores/resume-list-store";
import styled from "styled-components";

const Container = styled.div``;

const Sex = () => {
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
    { key: "남자", value: "남자" },
    { key: "여자", value: "여자" },
    { key: "무관", value: "무관" }
  ];

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "무관" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`sex=${selectedOption}`);
    } else {
      removeResumeFilterQuery("sex");
    }
  };

  return (
    <Container>
      <DropdownSingleSelectItem
        label="성별"
        options={options}
        onSelect={handleSelect}
        selectedOption={getResumeFilterQuery("sex") || "무관"}
      />
    </Container>
  );
};

export default Sex;
