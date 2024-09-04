import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  padding: ${pxToVw(12)};
  border-radius: ${pxToVw(10)};
  width: ${pxToVw(340)};
  height: ${pxToVw(145)};
  flex: 0 0 auto;
  background-color: ${colors.white};
`;

const HeaderContainer = styled.div`
  display: flex;
`;

const HeaderTitle = styled.span`
  ${fonts.greyTextBold16}
`;

const ContentContainer = styled.div`
  display: flex;
`;
const ContentLeftContainer = styled.div``;

interface JobPostingItemProps {
  job: any;
}

const JobPostingItem = ({ job }: JobPostingItemProps) => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>{`준오헤어`}</HeaderTitle>
      </HeaderContainer>
    </Container>
  );
};

export default JobPostingItem;
