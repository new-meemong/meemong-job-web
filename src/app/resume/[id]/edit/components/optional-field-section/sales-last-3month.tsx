import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import SingleOptionList from "./base/single-option-list";
import { SalesLast3MonthsAvgKeyResume } from "@/types/resume-keys";

const Container = styled.div``;

const SalesLast3Month = () => {
  const { salesLast3MonthsAvg, setSalesLast3MonthsAvg } = useResumeEditStore(
    (state) => ({
      salesLast3MonthsAvg: state.salesLast3MonthsAvg,
      setSalesLast3MonthsAvg: state.setSalesLast3MonthsAvg,
      hasDesignerOptionNull: state.hasDesignerOptionNull,
      appliedRole: state.appliedRole
    })
  );

  const options = resumeOptions.salesLast3MonthsAvg;

  const handleSelect = (selectedOption: string | null) => {
    setSalesLast3MonthsAvg(selectedOption as SalesLast3MonthsAvgKeyResume);
  };

  return (
    <Container>
      <DropDownItem label={"이전 3개월 평균 매출"}>
        <SingleOptionList
          options={options}
          selectedOption={salesLast3MonthsAvg}
          onSelect={handleSelect}
          buttonSize="large"
        />
      </DropDownItem>
    </Container>
  );
};

export default SalesLast3Month;
