import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
// import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
// import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${pxToVw(52)};
  padding-bottom: ${pxToVw(12)};
  padding-left: ${pxToVw(8)};
  padding-right: ${pxToVw(8)};
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
`;

const LeftContainer = styled.div`
  width: ${pxToVw(40)};
`;

const RightContainer = styled.div`
  width: ${pxToVw(40)};
`;

const TitleContainer = styled.div``;

const Title = styled.span`
  ${fonts.greyNormal14}
`;

const TitleCount = styled.span`
  ${fonts.purplePrimaryBold14}
`;

interface SearchResultHeaderProps {
  count: number;
}

const SearchResultHeader = ({ count = 0 }: SearchResultHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <TitleContainer>
        <Title>{`검색결과  `}</Title>
        <TitleCount>{`${count} 개`}</TitleCount>
      </TitleContainer>
      <RightContainer />
    </Container>
  );
};

export default SearchResultHeader;
