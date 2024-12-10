import ArrowRightGreyOutlineIcon from "@/components/icons/arrow-right-grey-outline";
import JobPostingItem from "@/components/job-posting-item";
import { JobPostingType } from "@/types/job-posting-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  margin-top: ${pxToVw(20)};
  padding-top: ${pxToVw(20)};
  padding-bottom: ${pxToVw(24)};
  background-color: ${colors.purpleSecondary};
  border: 1px solid ${colors.greyBacground4};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: ${pxToVw(20)};
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

  -ms-overflow-style: none;
  scrollbar-width: none;

  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-snap-stop: always;
  &::-webkit-scrollbar {
    display: none;
  }

  padding-right: ${pxToVw(20)};
  padding-top: ${pxToVw(20)};
`;

const SnapItem = styled.div<{ $isFirst: boolean }>`
  scroll-snap-align: start; /* Ensures each item snaps into place */
  scroll-snap-stop: always;
  padding-left: ${(props) => (props.$isFirst ? pxToVw(20) : pxToVw(12))};
`;

const PremiumJobPosting = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source") || "app";

  const jobPostings: JobPostingType[] = [];
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
          <SnapItem key={index} $isFirst={index === 0}>
            <JobPostingItem jobPosting={jobPosting} source={source} />
          </SnapItem>
        ))}
      </JobPostingContainer>
    </Container>
  );
};

export default PremiumJobPosting;
