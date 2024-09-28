import { useResumeEditStore } from "@/stores/resume-edit-store";
import { resumeOptions } from "@/types/resume-optons";
import styled from "styled-components";
import EditResumeOptonMultiSelect from "./edit-resume-option-multi-select";
import { DesignerLicensesKeyResume } from "@/types/resume-keys";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DesignerLicensesSelect = () => {
  const {
    designerLicenses,
    setDesignerLicenses,
    appliedRole,
    hasDesignerOptionNull,
    hasInternOptionNull
  } = useResumeEditStore((state) => ({
    designerLicenses: state.designerLicenses,
    setDesignerLicenses: state.setDesignerLicenses,
    appliedRole: state.appliedRole,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull
  }));

  const licenses = resumeOptions.designerLicenses || [];

  let hasError = false;

  if (appliedRole === "디자이너") {
    hasError = designerLicenses?.length === 0 && hasDesignerOptionNull;
  } else if (appliedRole === "인턴") {
    hasError = designerLicenses?.length === 0 && hasInternOptionNull;
  }

  const handleSelect = (selectedOption: string) => {
    console.log("moonsae selectedOption", selectedOption);
    setDesignerLicenses(selectedOption as DesignerLicensesKeyResume);
  };
  console.log("designerLicenses", designerLicenses);
  return (
    <Container>
      <EditResumeOptonMultiSelect
        label="미용 라이센스 (중복 가능)*"
        options={licenses}
        selectedOptions={designerLicenses}
        errorMessage="라이센스을 선택해주세요."
        onSelect={handleSelect}
        isError={hasError}
      />
    </Container>
  );
};

export default DesignerLicensesSelect;
