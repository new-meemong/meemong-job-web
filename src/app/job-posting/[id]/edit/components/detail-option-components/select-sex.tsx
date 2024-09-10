import BaseSingleInfoSelect from "@/components/select/base-single-info-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { jobPostingTypes, SexType } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  /* padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)}; */
  padding-top: ${pxToVw(8)};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(24)};
`;

const ContentContainer = styled.p``;

const InfoBold = styled.span`
  ${fonts.blackBold14}
`;

const InfoNormal = styled.span`
  ${fonts.blackNormal14}
`;

const InfoDot = styled.div`
  height: ${pxToVw(4)};
  width: ${pxToVw(4)};
  background-color: ${colors.black};
`;

const Info = () => {
  return (
    <InfoContainer>
      <ContentContainer>
        <InfoBold>대한민국 제 11조 평등이념</InfoBold>
        <InfoNormal>
          에 따라 고용에서 남녀의 평등한 기회 및 대우를 보장하고 있으며 이에
          따라 일/가정 양립지원에 관한 법률을 따라야합니다.
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <InfoBold>남녀고용평등법 제 2장 제 1절</InfoBold>
        <InfoNormal>
          에 따라 남녀는 근로자의 모집/채용/임금/교육/배치/승진/해고 등에서
          부당한 차별을 받지 않고, 평등한 기회를 대우 받아야 합니다.
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <div>
          <InfoDot />
          <InfoBold>직접 차별 : </InfoBold>

          <InfoNormal>
            성별, 혼인, 가족 내 지위, 임신 또는 출산 등의 사유로 합리적인
            이유없이 채용 혹은 근로조건을 다르게 하거나 그 외 부당한 대우를 하는
            경우
          </InfoNormal>
        </div>
      </ContentContainer>
    </InfoContainer>
  );
};

const SelectSex = () => {
  const { sex, setSex } = useJobPostingEditStore();
  const sexs = Object.values(jobPostingTypes.sex);

  const handleSelect = (selectedOption: string) => {
    setSex(selectedOption as SexType);
  };
  return (
    <Container>
      <BaseSingleInfoSelect
        label="성별"
        options={sexs}
        onSelect={handleSelect}
        selectedOption={sex}
        errorMessage="성별을 선택해주세요."
        isError={false}
        infoLabel="남녀고용평등법 안내"
        infoHeader="남녀고용평등법"
        info={<Info />}
      />
    </Container>
  );
};

export default SelectSex;
