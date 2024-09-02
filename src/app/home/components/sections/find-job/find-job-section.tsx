import styled from "styled-components";
import FindDesignerRequiredFilter from "../find-designer/find-designer-required-filter";
import pxToVw from "@/lib/dpi-converter";
import TalentSearchButton from "../../filters/talent-search-button";
import Banner from "../../banner";
import HomeDesignerSearchResultList from "../find-designer/home-designer-search-list";
import FindJobRequiredFilter from "./find-job-required-filter";

const Container = styled.div`
  width: 100%;
`;

const TalentSearchWrapper = styled.div`
  width: 100%;
  margin-top: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

const FindJobSection = () => {
  return (
    <Container>
      <FindJobRequiredFilter />
      {/* <FindDesignerRequiredFilter />
      <TalentSearchWrapper>
        <TalentSearchButton />
      </TalentSearchWrapper>
      <Banner />
      <HomeDesignerSearchResultList /> */}
    </Container>
  );
};

export default FindJobSection;
