import { SearchResultItemType } from "@/stores/search-naver-store";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useRouter } from "next/navigation";

const Container = styled.div``;

const Title = styled.div`
  ${fonts.blackBold16}
`;
const Address = styled.div`
  padding-top: ${pxToVw(8)};
  ${fonts.blackNormal14};
`;
export const SearchResultNaverItem = (item: SearchResultItemType) => {
  const { setStoreRegion } = useJobPostingEditStore();
  const router = useRouter();

  const handleClick = () => {
    const info = {
      title: item.title,
      address: item.address,
      mapx: item.mapx,
      mapy: item.mapy,
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

export default SearchResultNaverItem;
