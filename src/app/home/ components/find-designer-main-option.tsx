import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";
import DesignerTypeTab from "./designer-type-tab";
import SelectLocation from "./select-location";

const Container = styled.div`
  margin: 0 24px;
  border: 1px solid ${colors.purple_primary};
  padding: 12px;
  width: calc(100% - 48px);
  box-sizing: border-box;
  border-radius: 5px;
`;

const FindDesignerMainOption = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container>
      <DesignerTypeTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SelectLocation />
    </Container>
  );
};

export default FindDesignerMainOption;
