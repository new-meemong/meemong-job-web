import { colors } from "@/styles/colors";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${colors.purplePrimary};
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
  color: ${(props) => (props.$active ? colors.purplePrimary : colors.grey)};
  font-weight: ${(props) => (props.$active ? 700 : 500)};
`;

interface TabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}
const BaseTopTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <TabContainer>
      <Tab $active={activeTab === 0} onClick={() => setActiveTab(0)}>
        매장 취업하기
      </Tab>
      <Tab $active={activeTab === 1} onClick={() => setActiveTab(1)}>
        인재 찾아보기
      </Tab>
    </TabContainer>
  );
};

export default BaseTopTabs;
