import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StoreImage = styled(Image)`
  width: ${pxToVw(32)};
  height: ${pxToVw(32)};
  border-radius: 50%;
  margin-right: ${pxToVw(12)};
`;

const StoreName = styled.div`
  ${fonts.greyTextNormal16}
`;
const StoreRegion = styled.div`
  ${fonts.greyNormal10}
`;

const Divider = styled.div`
  height: ${pxToVw(6)};
  width: ${pxToVw(1)};
  margin: ${pxToVw(0)} ${pxToVw(4)};
  background-color: ${colors.greyBacground4};
`;

interface StoreInfoProps {
  storeImage: string;
  storeName: string;
  storeRegion: string;
}

const StoreInfo = ({ storeImage, storeName, storeRegion }: StoreInfoProps) => {
  return (
    <Container>
      <StoreImage src={storeImage} alt={storeName} width={32} height={32} />
      <StoreName>{storeName}</StoreName>
      <Divider />
      <StoreRegion>{storeRegion}</StoreRegion>
    </Container>
  );
};

export default StoreInfo;
