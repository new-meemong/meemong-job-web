import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import { useResumeListStore } from "@/stores/resume-list-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";

const Container = styled.div``;

const DesignerLicenses = () => {
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
    ...resumeOptions.designerLicenses.filter((option) => option.key !== "없음"),
    { key: "상관없음", value: "상관없음" }
  ];

  const selectedOptions =
    getResumeFilterQuery("designerLicenses")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      removeResumeFilterQuery("designerLicenses");
      return;
    }

    const updatedOptions = selectedOptions.includes(selectedOption)
      ? selectedOptions.filter((option) => option !== selectedOption)
      : [...selectedOptions, selectedOption];

    if (updatedOptions.length > 0) {
      addResumeFilterQuery(`designerLicenses=${updatedOptions.join(",")}`);
    } else {
      removeResumeFilterQuery("designerLicenses");
    }
  };

  return (
    <Container>
      <DropdownMultiSelectItem
        label="미용 라이센스 소유"
        options={options}
        selectedOptions={
          selectedOptions.length > 0 ? selectedOptions : ["상관없음"]
        }
        onSelect={handleSelect}
      />
    </Container>
  );
};

export default DesignerLicenses;
