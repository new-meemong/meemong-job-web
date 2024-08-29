import TextPrimaryBold14 from "@/components/texts/text-primary-bold-14";
import { colors } from "@/styles/colors";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: 34px;
  border-radius: 5px;
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
  color: ${(props) => (props.$active ? colors.purplePrimary : colors.grey)};
`;

interface TabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const DesignerTypeTab = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <TabContainer>
      <Tab $active={activeTab === 0} onClick={() => setActiveTab(0)}>
        <TextPrimaryBold14>디자이너</TextPrimaryBold14>
      </Tab>
      <Tab $active={activeTab === 1} onClick={() => setActiveTab(1)}>
        <TextPrimaryBold14>인턴</TextPrimaryBold14>
      </Tab>
    </TabContainer>
  );
};

export default DesignerTypeTab;
