import { useResumeListStore } from "@/stores/resume-list-store";
import styled from "styled-components";
import OptionalSingleDropdownFilter from "../../../filters/base/optional-single-dropdown-filter";

const Container = styled.div``;

const DesignerPromotionPeriod = () => {
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
    {
      key: "1년 이하",
      value: "1년 이하"
    },
    {
      key: "1년 6개월 이하",
      value: "1년 6개월 이하"
    },
    {
      key: "2년 이하",
      value: "2년 이하"
    },
    {
      key: "3년 미만",
      value: "3년 미만"
    },
    {
      key: "3년 이상",
      value: "3년 이상"
    },
    {
      key: "상관없음",
      value: "상관없음"
    }
  ];
  const selectedOption =
    getResumeFilterQuery("designerPromotionPeriod") || "상관없음";

  const handleSelect = (selectedOption: string | null) => {
    selectedOption = selectedOption === "상관없음" ? null : selectedOption;
    if (selectedOption) {
      addResumeFilterQuery(`designerPromotionPeriod=${selectedOption}`);
    } else {
      removeResumeFilterQuery("designerPromotionPeriod");
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
