import BaseSingleSelect from "@/components/select/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import { ParkingSpotCountKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectParkingSpotCount = () => {
  const { parkingSpotCount, setParkingSpotCount } = useJobPostingEditStore();
  const options = jobPostingOptions.parkingSpotCount;

  const handleSelect = (selectedOption: string) => {
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
        isError={false}
      />
    </Container>
  );
};

export default SelectParkingSpotCount;
