import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { ParkingSpotCountKey } from "@/types/job-posting-keys";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectParkingSpotCount = () => {
  const {
    parkingSpotCount,
    setParkingSpotCount,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.parkingSpotCount;
  let hasError = false;

  if (role === "디자이너") {
    hasError = parkingSpotCount === null && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = parkingSpotCount === null && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setParkingSpotCount(selectedOption as ParkingSpotCountKey);
  };
  return (
    <Container>
      <BaseSingleSelect
        label="매장 주차 가능 대수"
        options={options}
        selectedOption={parkingSpotCount}
        errorMessage="주차 가능 대수를 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default SelectParkingSpotCount;
