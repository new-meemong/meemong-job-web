import pxToVw from "@/lib/dpi-converter";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { SearchResultItemType } from "@/stores/search-naver-store";
import { fonts } from "@/styles/fonts";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import styled from "styled-components";

const Container = styled.div``;

const Title = styled.div`
  ${fonts.blackBold16}
`;
const Address = styled.div`
  padding-top: ${pxToVw(8)};
  ${fonts.blackNormal14};
`;
export const SearchResultItem = (item: SearchResultItemType) => {
  const { setStoreRegion } = useJobPostingEditStore();
  const router = useRouter();

  const handleClick = () => {
    const info = {
      title: item.title,
      address: item.address
    };
    setStoreRegion(info);
    router.back();
  };
  return (
    <Container onClick={handleClick}>
      <Title>{item.title}</Title>
      <Address>{item.address}</Address>
    </Container>
  );
};

export default SearchResultItem;
