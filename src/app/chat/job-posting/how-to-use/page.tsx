"use client";

import HowToUseHeader from "@/components/headers/HowToUseHeader";
import HowToUseIcon from "@/components/icons/HowToUseIcon";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  position: relative;
  height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 ${pxToVw(24)};
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${pxToVw(30)};
  padding-bottom: ${pxToVw(30)};
`;
const Title = styled.div`
  ${fonts.blackNormal28}
  padding-bottom: ${pxToVw(50)};
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: ${pxToVw(10)}; */
  padding-bottom: ${pxToVw(20)};
`;

const SubTitle = styled.div`
  ${fonts.blackBold18}
`;

const Description = styled.div`
  ${fonts.blackNormal16}
`;

const Button = styled.div`
  position: fixed;
  bottom: ${pxToVw(24)};
  ${fonts.whiteBold16}
  width: calc(100% - ${pxToVw(48)});
  height: ${pxToVw(48)};
  background-color: ${colors.deepCyan};
  border-radius: ${pxToVw(4)};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const HowToUsePage = () => {
  const router = useRouter();

  const handleAgree = () => {
    router.back();
  };

  return (
    <Container>
      <HowToUseHeader />
      <ContentContainer>
        <IconWrapper>
          <HowToUseIcon />
        </IconWrapper>
        <Title>미몽에 오신 것을 환영합니다.</Title>
        <TextWrapper>
          <SubTitle>내 모습 그대로 당당하게 😊</SubTitle>
          <Description>
            미몽은 투명하고 신뢰할 수 있는 이용 문화 정착을 위해 과도한 보정 /
            AI모델 / 선정적인 사진 등을 제한하고 있습니다.
          </Description>
        </TextWrapper>
        <TextWrapper>
          <SubTitle>초상권 & 권리를 최우선으로 👍</SubTitle>
          <Description>
            채팅방 내에서 초상권 계약을 진행하세요. 미몽이 아닌 타 플랫폼으로
            서비스 이용하실 경우, 초상권 계약 및 법적보호를 받으실 수 없습니다.
          </Description>
        </TextWrapper>
        <TextWrapper>
          <SubTitle>약속 시간을 꼭 지켜주세요 ⏰</SubTitle>
          <Description>
            약속하기 후 노쇼 발생시 영구 이용정지 될 수 있습니다. 지각시 시술이
            어려울 수 있습니다.
          </Description>
        </TextWrapper>
        <TextWrapper>
          <SubTitle>건전한 채팅문화 ⌨️</SubTitle>
          <Description>
            미몽의 목적과 무관한 불필요한 개인정보, 음담패설 등 보이면
            적극적으로 신고해 주세요.
          </Description>
        </TextWrapper>
        <TextWrapper>
          <SubTitle>미몽 용어 ⌨️</SubTitle>
          <Description>
            페이모델 : 디자이너가 모델에게 모델료를 지급합니다. 재료비 발생 :
            모델이 디자이너에게 최소한의 비용을 지불합니다. 초상권 계약 : 시술
            사진의 권리를 서로 확인하고 서명합니다.
          </Description>
        </TextWrapper>
        <Button onClick={handleAgree}>동의합니다</Button>
      </ContentContainer>
    </Container>
  );
};

export default HowToUsePage;
