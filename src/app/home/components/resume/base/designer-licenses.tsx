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
    ...resumeOptions.designerLicenses,
    { key: "상관없음", value: "상관없음" }
  ];
  console.log("moonsae options", options);
  const selectedOptions =
    getResumeFilterQuery("designerLicenses")?.split(",") || [];

  const handleSelect = (selectedOption: string) => {
    if (selectedOption === "상관없음") {
      // "상관없음"을 선택하면 필터를 제거하고 선택을 초기화
      removeResumeFilterQuery("designerLicenses");
    } else {
      let updatedOptions;

      if (selectedOptions.includes(selectedOption)) {
        // 이미 선택된 옵션이면 선택 해제
        updatedOptions = selectedOptions.filter(
          (option) => option !== selectedOption
        );
      } else {
        // 새로운 옵션이면 추가
        updatedOptions = [...selectedOptions, selectedOption];
      }

      if (updatedOptions.length > 0) {
        // 선택된 옵션이 있으면 쿼리로 추가
        addResumeFilterQuery(`designerLicenses=${updatedOptions.join(",")}`);
      } else {
        // 선택된 옵션이 없으면 필터 제거
        removeResumeFilterQuery("designerLicenses");
      }
    }
  };

  return (
    <Container>
      <DropdownMultiSelectItem
        label="미용 라이센스"
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
