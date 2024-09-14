import BaseSingleSelect from "@/components/selects/base-single-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { jobPostingOptions } from "@/types/job-posting-options";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const SelectIsOnsiteManger = () => {
  const { isOnsiteManager, setIsOnsiteManager } = useJobPostingEditStore();
  const options = jobPostingOptions.isOnsiteManager;

  const handleSelect = (selectedOption: boolean) => {
    setIsOnsiteManager(selectedOption);
  };

  return (
    <Container>
      <BaseSingleSelect
        label="샵 매니저 상주"
        options={options}
        selectedOption={isOnsiteManager}
        errorMessage="샵 매니저 상주 여부를 선택해주세요"
        onSelect={handleSelect}
        isError={false}
      />
    </Container>
  );
};

export default SelectIsOnsiteManger;
