import styled from "styled-components";
import InfoTitle from "./info-title";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { JobPostingType } from "@/types/job-posting-type";
import CopyBlackIcon from "@/components/icons/copy-black-icon";
import toast from "react-hot-toast";

const Container = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${pxToVw(4)};
  align-items: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;
const Address = styled.div`
  ${fonts.greyTextSemi16}
  padding-top: ${pxToVw(8)};
  padding-bottom: ${pxToVw(8)};
`;

type StoreLocationProps = Pick<JobPostingType, "storeAddress">;

const StoreLocation = ({ storeAddress }: StoreLocationProps) => {
  const handleCopyAddress = () => {
    navigator.clipboard
      .writeText(storeAddress)
      .then(() => {
        toast.dismiss();
        toast("주소가 복사되었습니다.");
      })
      .catch((err) => {
        console.error("Failed to copy the address: ", err);
      });
  };

  return (
    <Container>
      <HeaderContainer onClick={handleCopyAddress}>
        <InfoTitle title={"매장 위치"} />
        <CopyBlackIcon />
      </HeaderContainer>
      <Address>{storeAddress}</Address>
    </Container>
  );
};

export default StoreLocation;
