import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";
import DesignerTypeTab from "./filters/designer-type-tab";
import SelectLocation from "./filters/select-location";
import DropdownItem from "@/components/dropdown-item";
import OptionalFilterList from "./filters/optional-filter-list";

const Container = styled.div`
  margin: 0 24px;
  border: 1px solid ${colors.purplePrimary};
  padding: 12px;
  width: calc(100% - 48px);
  border-radius: 5px;
`;

const FindDesignerRequiredFilter = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container>
      <DesignerTypeTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SelectLocation />
      <DropdownItem label="근무형태" content="무관" />
      <DropdownItem label="성별" content="무관" />
      <DropdownItem label="경력" content="상관없음" />
      <DropdownItem label="미용 라이센스" content="상관없음" />
      <OptionalFilterList />
    </Container>
  );
};

export default FindDesignerRequiredFilter;
