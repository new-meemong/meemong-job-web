import { useResumeEditStore } from "@/stores/resume-edit-store";
import { SettlementAllowanceKeyResume } from "@/types/resume-keys";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import EditResumeOptonSingleSelect from "./base/edit-resume-option-single-select";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SettlementAllowanceSelect = () => {
  const {
    settlementAllowance,
    setSettlementAllowance,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useResumeEditStore((state) => ({
    settlementAllowance: state.settlementAllowance,
    setSettlementAllowance: state.setSettlementAllowance,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull
  }));

  const options = resumeOptions.settlementAllowance;
  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = !settlementAllowance && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = !settlementAllowance && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string | null) => {
    setSettlementAllowance(selectedOption as SettlementAllowanceKeyResume);
  };

  return (
    <Container>
      <EditResumeOptonSingleSelect
        label={"정착지원금*"}
        options={options}
        selectedOption={settlementAllowance}
        onSelect={handleSelect}
        errorMessage="근무 형태를 선택해주세요."
        isError={hasError}
        buttonSize="small"
      />
    </Container>
  );
};

export default SettlementAllowanceSelect;
