import BaseSingleInfoSelectAge from "@/components/selects/base-single-info-select-age";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { jobPostingOptions } from "@/types/job-posting-options";
import Link from "next/link";
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

const ContentContainerWrapper = styled.div``;

const InfoNormal = styled.span`
  ${fonts.blackNormal14};
  white-space: pre-line;
`;

const InfoRed = styled.span`
  ${fonts.redBold14}
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

const InfoLink = styled(Link)`
  ${fonts.purplePrimaryBold14}
  text-decoration: underline;
`;

const Info = () => {
  return (
    <InfoContainer>
      <ContentContainer>
        <InfoNormal>
          채용시 합리적인 이유 없이 연령 제한을 하는 경우 연령차별 금지법 위반에
          해당되어 500만원 이하의 벌금이 부과될 수 있습니다.
        </InfoNormal>
      </ContentContainer>
      <ContentContainer>
        <InfoRed>
          또한, 등록제한 규정에 따라 사전 동의 없이 삭제 조치될 수 있으며 삭제된
          게시글을 복구할 수 없습니다.
        </InfoRed>
      </ContentContainer>
      <ContentContainerWrapper>
        <InfoNormal>{`차별사례`}</InfoNormal>
        <ContentContainer>
          <DotContainer>
            <InfoDot />
          </DotContainer>
          <InfoNormal>
            지원자의 나이를 제한하거나 특정 연령층을 선호하는 경우
          </InfoNormal>
        </ContentContainer>
      </ContentContainerWrapper>
      <ContentContainerWrapper>
        <InfoNormal>차별로 보지 않는 사례</InfoNormal>
        <ContentContainer>
          <DotContainer>
            <InfoDot />
          </DotContainer>
          <InfoNormal>
            직무 성질상 특정 연령 기준이 불가피한 경우 (진정 작업 자격)
          </InfoNormal>
        </ContentContainer>
        <ContentContainer>
          <DotContainer>
            <InfoDot />
          </DotContainer>
          <InfoNormal>
            근속 기간의 차이를 고려하여 임금이나 임금 외의 금품과 복리후생에서
            합리적인 차등을 두는 경우
          </InfoNormal>
        </ContentContainer>
        <ContentContainer>
          <DotContainer>
            <InfoDot />
          </DotContainer>
          <InfoNormal>법률 등에 근거한 청년의 설정</InfoNormal>
        </ContentContainer>
        <ContentContainer>
          <DotContainer>
            <InfoDot />
          </DotContainer>
          <InfoNormal>
            이 법이나 다른 법률에 따라 특정 연령 집단의 고용유지 및 고용촉진을
            위한 지원 조치를 하는 경우
          </InfoNormal>
        </ContentContainer>
      </ContentContainerWrapper>
      <InfoLink href="">연령차별금지법에 대한 자세한 정보</InfoLink>
    </InfoContainer>
  );
};

const SelectIsRestrictedAge = () => {
  const {
    isRestrictedAge,
    setIsRestrictedAge,
    hasDesignerOptionNull,
    hasInternOptionNull,
    role
  } = useJobPostingEditStore();
  const options = jobPostingOptions.isRestrictedAge;
  let hasError = false;

  if (role === "디자이너") {
    hasError = isRestrictedAge === null && hasDesignerOptionNull;
  } else {
    hasError = isRestrictedAge === null && hasInternOptionNull;
  }

  const handleSelect = (option: boolean | null) => {
    setIsRestrictedAge(option);
  };

  return (
    <Container>
      <BaseSingleInfoSelectAge
        label="연령"
        options={options}
        selectedOption={isRestrictedAge}
        errorMessage="연령을 선택해주세요."
        isError={hasError}
        onSelect={handleSelect}
        infoLabel="연령차별금지법 안내"
        infoHeader="연령차별금지법"
        info={<Info />}
      />
    </Container>
  );
};

export default SelectIsRestrictedAge;
