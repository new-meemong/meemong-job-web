import pxToVw from "@/lib/dpi-converter";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${pxToVw(70)};
  gap: ${pxToVw(8)};
`;

const PlayStoreButton = styled.div`
  width: ${pxToVw(128)};
  height: ${pxToVw(38)};
  position: relative;
`;
const AppStoreButton = styled.div`
  width: ${pxToVw(128)};
  height: ${pxToVw(38)};
  position: relative;
`;

const StoreFloatingButton = () => {
  const handlePlayStoreButtonClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.meemong.second&pcampaignid=web_share",
      "_blank"
    );
  };

  const handleAppStoreButtonClick = () => {
    window.open(
      "https://apps.apple.com/kr/app/%EB%AF%B8%EB%AA%BD-%EB%8B%B9%EC%8B%A0%EB%8F%84-%ED%97%A4%EC%96%B4%EB%AA%A8%EB%8D%B8/id1572588554?l=en-GB",
      "_blank"
    );
  };

  return (
    <Container>
      <PlayStoreButton onClick={handlePlayStoreButtonClick}>
        <Image src="/images/playstore_download.svg" alt="Play Store" fill />
      </PlayStoreButton>
      <AppStoreButton onClick={handleAppStoreButtonClick}>
        <Image src="/images/appstore_download.svg" alt="App Store" fill />
      </AppStoreButton>
    </Container>
  );
};

export default StoreFloatingButton;
