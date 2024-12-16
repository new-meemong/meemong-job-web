import BackIcon from "./header-icons/BackIcon";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useRouter } from "next/navigation";

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
  border-bottom: ${pxToVw(1)} solid ${colors.greyLine};
  z-index: 1;
`;

const LeftContainer = styled.div`
  width: ${pxToVw(40)};
`;

const RightContainer = styled.div`
  width: ${pxToVw(40)};
`;

const Title = styled.span`
  ${fonts.greyTextBold18}
`;

const JobPostingEditHeader = () => {
  const { setHasDesignerOptionNull, setHasInternOptionNull } =
    useJobPostingEditStore();
  const router = useRouter();

  const handleBackClick = () => {
    setHasDesignerOptionNull(false);
    setHasInternOptionNull(false);
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>모집공고 작성</Title>
      <RightContainer />
    </Container>
  );
};

export default JobPostingEditHeader;
