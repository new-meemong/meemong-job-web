import Image from "next/image";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  gap: ${pxToVw(8)};
  padding-top: ${pxToVw(12)};
  padding-bottom: ${pxToVw(12)};
  background-color: ${colors.white};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const StoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${pxToVw(8)};
`;

const PlayStoreButton = styled.div`
  width: ${pxToVw(168)};
  height: ${pxToVw(41)};
  position: relative;
`;
const AppStoreButton = styled.div`
  width: ${pxToVw(168)};
  height: ${pxToVw(41)};
  position: relative;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${fonts.whiteBold16}
  height: ${pxToVw(48)};
  background-color: ${colors.purplePrimary};
  width: 100%;
  max-width: ${pxToVw(343)};
  border-radius: ${pxToVw(4)};
`;

const StoreFloatingButton = ({ title }: { title: string }) => {
  const handlePlayStoreButtonClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.meemong.second&pcampaignid=web_share",
      "_blank",
    );
  };

  const handleAppStoreButtonClick = () => {
    window.open(
      "https://apps.apple.com/kr/app/%EB%AF%B8%EB%AA%BD-%EB%8B%B9%EC%8B%A0%EB%8F%84-%ED%97%A4%EC%96%B4%EB%AA%A8%EB%8D%B8/id1572588554?l=en-GB",
      "_blank",
    );
  };

  return (
    <Container>
      <Title
        onClick={() => {
          toast("아래 스토어에서 다운받아 주세요.");
        }}
      >
        {title}
      </Title>
      <StoreContainer>
        <PlayStoreButton onClick={handlePlayStoreButtonClick}>
          <Image src="/images/playstore_download.svg" alt="Play Store" fill />
        </PlayStoreButton>
        <AppStoreButton onClick={handleAppStoreButtonClick}>
          <Image src="/images/appstore_download.svg" alt="App Store" fill />
        </AppStoreButton>
      </StoreContainer>
    </Container>
  );
};

export default StoreFloatingButton;
