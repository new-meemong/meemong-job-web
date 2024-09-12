import BaseSingleInfoSelect from "@/components/select/base-single-info-select";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { jobPostingOptions } from "@/types/job-posting-options";
import { SexKey } from "@/types/job-posting-types";
import styled from "styled-components";

const Container = styled.div`
  padding-top: ${pxToVw(8)};
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(24)};
`;

const ContentContainer = styled.div`
  display: flex;
`;

const InfoBold = styled.span`
  ${fonts.blackBold14}
`;

const InfoNormal = styled.span`
  ${fonts.blackNormal14}
`;

const DotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToVw(20)};
  height: ${pxToVw(20)};
  flex-shrink: 0;
`;
const InfoDot = styled.div`
  height: ${pxToVw(4)};
  width: ${pxToVw(4)};
  border-radius: 50%;
  background-color: ${colors.black};
`;

const Info = () => {
  return (
    <InfoContainer>
      <ContentContainer>
        <InfoNormal>
          <InfoBold>대한민국 제 11조 평등이념</InfoBold>에 따라 고용에서 남녀의
          평등한 기회 및 대우를 보장하고 있으며 이에 따라 일/가정 양립지원에
          관한 법률을 따라야 합니다.
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <InfoNormal>
          <InfoBold>남녀고용평등법 제 2장 제 1절</InfoBold>에 따라 남녀는
          근로자의 모집/채용/임금/교육/배치/승진/해고 등에서 부당한 차별을 받지
          않고, 평등한 기회를 대우 받아야 합니다.
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <InfoNormal>
          <InfoBold>직접 차별 : </InfoBold>
          성별, 혼인, 가족 내 지위, 임신 또는 출산 등의 사유로 합리적인 이유
          없이 채용 혹은 근로조건을 다르게 하거나 그 외 부당한 대우를 하는 경우
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <InfoNormal>
          <InfoBold>간접 차별 : </InfoBold>
          채용/근로조건이 동일해도, 그 조건을 충족할 수 있는 여부가 특정 성에게
          불리할 수밖에 없는 경우
        </InfoNormal>
      </ContentContainer>
    </InfoContainer>
  );
};

const SelectSex = () => {
  const { sex, setSex } = useJobPostingEditStore();
  const sexs = jobPostingOptions.sex;

  const handleSelect = (selectedOption: string) => {
    setSex(selectedOption as SexKey);
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
