import styled from "styled-components";
import BackIcon from "./header-icons/back-icon";
import { useRouter } from "next/navigation";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import OptionIcon from "./header-icons/option-icon";

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

interface ResumeHeaderProps {
  title: string;
}

const JobPostingHeader = ({ title }: ResumeHeaderProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Container>
      <LeftContainer onClick={handleBackClick}>
        <BackIcon />
      </LeftContainer>
      <Title>{title}</Title>
      <RightContainer>
        <OptionIcon />
      </RightContainer>
    </Container>
  );
};

export default JobPostingHeader;