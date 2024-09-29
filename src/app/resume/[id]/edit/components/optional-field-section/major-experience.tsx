import styled from "styled-components";
import DropDownItem from "./base/drop-down-item";
import ResumeEditInput from "../base/resume-edit-input";
import { fonts } from "@/styles/fonts";
import { useResumeEditStore } from "@/stores/resume-edit-store";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SmallLabel = styled.div`
  ${fonts.greyTextEditLabelBold14}
  margin-top: ${pxToVw(12)};
`;

const MajorExperience = () => {
  const {
    designerMajorExperienceCompanyName,
    setDesignerMajorExperienceCompanyName,
    designerMajorExperienceDuration,
    setDesignerMajorExperienceDuration,
    designerMajorExperienceRole,
    setDesignerMajorExperienceRole,
    internMajorExperienceCompanyName,
    setInternMajorExperienceCompanyName,
    internMajorExperienceDuration,
    setInternMajorExperienceDuration,
    internMajorExperienceRole,
    setInternMajorExperienceRole,
    appliedRole
  } = useResumeEditStore((state) => ({
    designerMajorExperienceCompanyName:
      state.designerMajorExperienceCompanyName,
    setDesignerMajorExperienceCompanyName:
      state.setDesignerMajorExperienceCompanyName,
    designerMajorExperienceDuration: state.designerMajorExperienceDuration,
    setDesignerMajorExperienceDuration:
      state.setDesignerMajorExperienceDuration,
    designerMajorExperienceRole: state.designerMajorExperienceRole,
    setDesignerMajorExperienceRole: state.setDesignerMajorExperienceRole,
    internMajorExperienceCompanyName: state.internMajorExperienceCompanyName,
    setInternMajorExperienceCompanyName:
      state.setInternMajorExperienceCompanyName,
    internMajorExperienceDuration: state.internMajorExperienceDuration,
    setInternMajorExperienceDuration: state.setInternMajorExperienceDuration,
    internMajorExperienceRole: state.internMajorExperienceRole,
    setInternMajorExperienceRole: state.setInternMajorExperienceRole,

    appliedRole: state.appliedRole
  }));

  const handleMajorExperienceCompanyNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (appliedRole === "디자이너") {
      setDesignerMajorExperienceCompanyName(e.target.value);
    } else if (appliedRole === "인턴") {
      setInternMajorExperienceCompanyName(e.target.value);
    }
  };

  const handleMajorExperienceDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (appliedRole === "디자이너") {
      setDesignerMajorExperienceDuration(e.target.value);
    } else if (appliedRole === "인턴") {
      setInternMajorExperienceDuration(e.target.value);
    }
  };

  const handleMajorExperienceRoleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (appliedRole === "디자이너") {
      setDesignerMajorExperienceRole(e.target.value);
    } else if (appliedRole === "인턴") {
      setInternMajorExperienceRole(e.target.value);
    }
  };

  return (
    <Container>
      <DropDownItem label="대표 경력">
        <ItemContainer>
          <SmallLabel>업체명</SmallLabel>
          <ResumeEditInput
            type="text"
            placeholder="업체명을 입력해주세요"
            value={
              appliedRole === "디자이너"
                ? designerMajorExperienceCompanyName || ""
                : internMajorExperienceCompanyName || ""
            }
            onChange={handleMajorExperienceCompanyNameChange}
            $hasError={false}
          />
          <SmallLabel>근무기간</SmallLabel>
          <ResumeEditInput
            type="text"
            placeholder="근무기간을 입력해주세요"
            value={
              appliedRole === "디자이너"
                ? designerMajorExperienceDuration || ""
                : internMajorExperienceDuration || ""
            }
            onChange={handleMajorExperienceDurationChange}
            $hasError={false}
          />
          <SmallLabel>직급</SmallLabel>
          <ResumeEditInput
            type="text"
            placeholder="직급을 입력해주세요"
            value={
              appliedRole === "디자이너"
                ? designerMajorExperienceRole || ""
                : internMajorExperienceRole || ""
            }
            onChange={handleMajorExperienceRoleChange}
            $hasError={false}
          />
        </ItemContainer>
      </DropDownItem>
    </Container>
  );
};

export default MajorExperience;
