import styled from "styled-components";
import EditResumeOptonSelect from "./edit-resume-option-single-select";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import { RoleKeyResume } from "@/types/resume-keys";
import EditResumeLabel from "../edit-resume-label";

type SizeType = "small" | "large";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToVw(4)};
  padding-top: ${pxToVw(12)};
`;

const Button = styled.div<{
  $isSelected: boolean;
  $size: SizeType;
}>`
  ${(props) =>
    props.$isSelected ? fonts.purplePrimaryNormal12 : fonts.greyNormal12};
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${pxToVw(34)};
  width: ${(props) =>
    props.$size === "large"
      ? pxToVw(102)
      : props.$size === "small"
      ? pxToVw(77)
      : pxToVw(86)}; /* medium에 대한 기본값 설정 */
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};
  cursor: pointer;
`;

const AppliedRoleSelect = () => {
  const { appliedRole, setAppliedRole } = useResumeEditStore((state) => ({
    appliedRole: state.appliedRole,
    setAppliedRole: state.setAppliedRole
  }));
  const options = resumeOptions.appliedRole;

  const handleSelect = (selectedOption: string) => {
    setAppliedRole(selectedOption as RoleKeyResume);
  };
  return (
    <Container>
      <EditResumeLabel label={"지원 분야*"} />
      <ButtonContainer>
        {options.map((option) => (
          <Button
            $size="small"
            key={option.key}
            $isSelected={appliedRole === option.key}
            onClick={() => handleSelect(option.key)}
          >
            {option.value}
          </Button>
        ))}
      </ButtonContainer>
    </Container>
  );
};

export default AppliedRoleSelect;
