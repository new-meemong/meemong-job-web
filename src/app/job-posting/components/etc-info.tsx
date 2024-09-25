import styled from "styled-components";
import InfoTitle from "./info-title";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { JobPostingType } from "@/types/job-posting-type";

const Container = styled.div``;

const Caution = styled.div`
  ${fonts.greyTextNormal12}
  white-space: pre-wrap;
  line-height: ${pxToVw(24)};
  margin-top: ${pxToVw(16)};
  margin-bottom: ${pxToVw(16)};
  padding: ${pxToVw(10)};
  background-color: ${colors.greyCautionBackground};
`;

const Description = styled.div`
  ${fonts.greyTextNormal16}
  line-height: ${pxToVw(24)};
`;

type EtcInfoProps = Pick<JobPostingType, "storeName" | "description">;

const EtcInfo = ({ storeName, description }: EtcInfoProps) => {
  const cautionText = `본 정보는 ${storeName}에서 미몽에 등록한 사용정보입니다.\n본 정보의 책임은 ${storeName}에게 있습니다.\n본 정보를 미몽의 동의 없이 무단전재, 재배포, 재가공, 구직 활동 이외의 용도로 사용 시 형사 및 민사 법적 책임이 있을 수 있습니다.`;
  return (
    <Container>
      <InfoTitle title={"채용 세부 정보"} />
      <Caution>{cautionText}</Caution>
      <Description>{description}</Description>
    </Container>
  );
};

export default EtcInfo;
