import { colors } from "@/styles/styles";
import { useState } from "react";
import styled from "styled-components";
import DesignerTypeTab from "./options/designer-type-tab";
import SelectLocation from "./options/select-location";
import DropdownItem from "@/components/dropdown-item";
import OptionDetailButton from "./options/option-detail-button";

const Container = styled.div`
  margin: 0 24px;
  border: 1px solid ${colors.purple_primary};
  padding: 12px;
  width: calc(100% - 48px);
  border-radius: 5px;
`;

const FindDesignerMainOption = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container>
      <DesignerTypeTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SelectLocation />
      <DropdownItem label="근무형태" content="무관" />
      <DropdownItem label="성별" content="무관" />
      <DropdownItem label="경력" content="상관없음" />
      <DropdownItem label="미용 라이센스" content="상관없음" />
      <OptionDetailButton />
    </Container>
  );
};

export default FindDesignerMainOption;
