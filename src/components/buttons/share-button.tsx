import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import ShareWhiteIcon from "../icons/share-white-icon";
import { fonts } from "@/styles/fonts";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  ${fonts.whiteNormal12}
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${pxToVw(8)};
  right: ${pxToVw(16)};
  top: ${pxToVw(16)};
  padding: ${pxToVw(8)};
  gap: ${pxToVw(2)};
  z-index: 100;
`;

const ShareButton = () => {
  const handleShareButtonClick = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      toast.dismiss();
      toast("URL이 복사되었습니다.", {
        style: {
          pointerEvents: "none" // Make the toast non-interactive
        }
      }); // 복사 완료 후 알림
    } catch (err) {
      console.error("URL 복사 실패:", err);
      toast.dismiss();
      toast("URL 복사에 실패했습니다.", {
        style: {
          pointerEvents: "none" // Make the toast non-interactive
        }
      });
    }
  };
  return (
    <Container onClick={handleShareButtonClick}>
      <ShareWhiteIcon />
      URL공유
      <Toaster />
    </Container>
  );
};

export default ShareButton;
