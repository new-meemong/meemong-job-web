import ArrowRightGreyOutlineIcon from "@/components/icons/arrow-right-grey-outline";
import JobPostingItem from "@/components/job-posting-item";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const Container = styled.div`
  margin-top: ${pxToVw(20)};
  padding: ${pxToVw(20)};
  background-color: ${colors.purpleSecondary};
  border: 1px solid ${colors.greyBacground4};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const HeaderTitleArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${pxToVw(4)};
`;

const HeaderTitle = styled.span`
  ${fonts.blackBold16};
`;
const HeaderSubTitle = styled.span`
  ${fonts.blackSemi12};
`;

const JobPostingContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${pxToVw(10)};

  -ms-overflow-style: none;
  scrollbar-width: none;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  /* &::-webkit-scrollbar {
    display: none;
  } */
`;

const PremiumJobPosting = () => {
  const jobPostings = [{}, {}, {}, {}, {}, {}];
  return (
    <Container>
      <Header>
        <HeaderTitleArea>
          <HeaderTitle>미몽 프리미엄 채용관</HeaderTitle>
          <HeaderSubTitle>{`(광고)`}</HeaderSubTitle>
        </HeaderTitleArea>
        <ArrowRightGreyOutlineIcon />
      </Header>
      <JobPostingContainer>
        {jobPostings.map((jobPosting, index) => (
          <JobPostingItem key={index} job={jobPosting} />
        ))}
      </JobPostingContainer>
    </Container>
  );
};

export default PremiumJobPosting;
