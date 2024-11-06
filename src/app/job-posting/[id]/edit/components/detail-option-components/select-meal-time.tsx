import BaseSingleSelect from "@/components/selects/base-single-select";
import { MealTimeKey } from "@/types/job-posting-keys";
import { jobPostingOptions } from "@/types/job-posting-options";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectMealTime = () => {
  const {
    mealTime,
    setMealTime,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role,
  } = useJobPostingEditStore();
  const options = jobPostingOptions.mealTime;
  let hasError = false;

  if (role === "디자이너") {
    hasError = mealTime === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = mealTime === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
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
        isError={hasError}
      />
    </Container>
  );
};

export default SelectMealTime;
