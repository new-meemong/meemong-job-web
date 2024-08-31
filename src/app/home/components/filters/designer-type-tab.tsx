import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  border-radius: ${pxToVw(5)};
  overflow: hidden;
`;

const Tab = styled.div<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  text-align: center;

  background-color: ${(props) =>
    props.$active ? colors.purpleBackgroundActive : colors.greyBackground};
  ${(props) =>
    props.$active ? fonts.purplePrimaryBold14 : fonts.greyText4Bold14};
`;

interface TabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const DesignerTypeTab = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <TabContainer>
      <Tab $active={activeTab === 0} onClick={() => setActiveTab(0)}>
        디자이너
      </Tab>
      <Tab $active={activeTab === 1} onClick={() => setActiveTab(1)}>
        인턴
      </Tab>
    </TabContainer>
  );
};

export default DesignerTypeTab;
