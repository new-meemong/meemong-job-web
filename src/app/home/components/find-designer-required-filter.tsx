import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";
import DesignerTypeTab from "./filters/designer-type-tab";
import SelectLocation from "./filters/select-location";
import DropdownItem from "@/components/dropdown-item";
import OptionalFilterList from "./filters/optional-filter-list";
import BottomModal from "../../../components/bottom-modal";

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
      <DropdownItem
        label="근무형태"
        options={["정규직", "스페어(알바)", "무관"]}
      />
      <DropdownItem label="성별" options={["남", "여", "무관"]} />
      <DropdownItem
        label="경력"
        options={["1년 이상", "3년 이상", "5년 이상", "상관없음"]}
      />
      <DropdownItem
        label="미용 라이센스"
        options={["자격증", "면허증", "없음", "상관 없음"]}
      />
      <OptionalFilterList />
    </Container>
  );
};

export default FindDesignerRequiredFilter;
