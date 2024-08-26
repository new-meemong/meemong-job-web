import { colors } from "@/styles/styles";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${colors.purple_primary};
`;

const Tab = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 50%;
  height: 100%;
  text-align: center;

  background-color: ${(props) =>
    props.active ? colors.purple_background_active : colors.white};
  color: ${(props) => (props.active ? colors.purple_primary : colors.grey)};
`;

interface TabsProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}
const BaseTopTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  return (
    <TabContainer>
      <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>
        매장 취업하기
      </Tab>
      <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
        인재 찾아보기
      </Tab>
    </TabContainer>
  );
};

export default BaseTopTabs;
