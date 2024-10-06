import pxToVw from "@/lib/dpi-converter";
import { HomeTopTabType } from "@/stores/app-state-store";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(50)};
  border-bottom: ${pxToVw(1)} solid ${colors.purplePrimary};
`;

const Tab = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  text-align: center;

  background-color: ${(props) =>
    props.$active ? colors.purpleBackgroundActive : colors.white};
  ${(props) => (props.$active ? fonts.purplePrimaryBold16 : fonts.greySemi16)}
`;

interface TabsProps {
  activeTab: HomeTopTabType;
  setActiveTab: (index: HomeTopTabType) => void;
}
const BaseTopTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <TabContainer>
      <Tab
        $active={activeTab === "jobPosting"}
        onClick={() => setActiveTab("jobPosting")}
      >
        매장 취업하기
      </Tab>
      <Tab
        $active={activeTab === "resume"}
        onClick={() => setActiveTab("resume")}
      >
        인재 찾아보기
      </Tab>
    </TabContainer>
  );
};

export default BaseTopTabs;
