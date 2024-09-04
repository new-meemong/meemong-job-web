import styled from "styled-components";
import FindDesignerRequiredFilter from "./find-designer-required-filter";
import pxToVw from "@/lib/dpi-converter";
import TalentSearchButton from "./talent-search-button";
import Banner from "../../banner";
import ResumeList from "./resume-list";

const Container = styled.div`
  width: 100%;
`;

const TalentSearchWrapper = styled.div`
  width: 100%;
  margin-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const FindDesignerSection = () => {
  return (
    <Container>
      <FindDesignerRequiredFilter />
      <TalentSearchWrapper>
        <TalentSearchButton />
      </TalentSearchWrapper>
      <Banner />
      <ResumeList />
    </Container>
  );
};

export default FindDesignerSection;
