import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div``;

const Title = styled.div`
  ${fonts.blackBold16}
`;
const Address = styled.div`
  padding-top: ${pxToVw(8)};
  ${fonts.blackNormal14};
`;

export const SearchResultAddressItem = (item: {
  roadAddr: string;
  jibunAddr: string;
  onClick: () => void;
}) => {
  const router = useRouter();

  const handleClick = () => {
    item.onClick();
  };

  return (
    <Container onClick={handleClick}>
      <Title>{item.roadAddr}</Title>
      <Address>{item.jibunAddr}</Address>
    </Container>
  );
};

export default SearchResultAddressItem;
