import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";

const Container = styled.div`
  margin-top: ${pxToVw(24)};
`;

const Label = styled.div`
  ${fonts.greyText4Bold12}
  margin-bottom: ${pxToVw(4)};
`;

const ContentContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  ${fonts.greyText4Semi12}
  line-height: 150%;
`;

const DotContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${pxToVw(15)};
  height: ${pxToVw(15)};
  flex-shrink: 0;
`;
const InfoDot = styled.div`
  height: ${pxToVw(2)};
  width: ${pxToVw(2)};
  border-radius: 50%;
  background-color: ${colors.greyText4};
`;

const JobPostingEditNote = () => {
  return (
    <Container>
      <Label>참고 사항</Label>
      <ContentContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <Content>
          모집공고는 ‘공고 노출 지역’에서 선택한 지역 기준으로 지역별로 최대
          5개까지 올릴 수 있습니다.
        </Content>
      </ContentContainer>
      <ContentContainer>
        <DotContainer>
          <InfoDot />
        </DotContainer>
        <Content>
          프리미엄/일반 공고 구분 없이 최대 갯수 이내로 등록 가능합니다.
        </Content>
      </ContentContainer>
    </Container>
  );
};

export default JobPostingEditNote;
