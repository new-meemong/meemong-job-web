import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { MealTimeKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectMealTime = () => {
  const { mealTime, setMealTime } = useJobPostingEditStore();
  const options = jobPostingOptions.mealTime;

  const handleSelect = (selectedOption: string) => {
    setMealTime(selectedOption as MealTimeKey);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="식사 시간"
        options={options}
        selectedOption={mealTime}
        errorMessage="식사 시간을 선택해주세요."
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectMealTime;
