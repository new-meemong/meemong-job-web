import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";
import DesignerTypeTab from "../../filters/designer-type-tab";
import SelectLocation from "../../filters/select-location";
import OptionalFilterList from "../../filters/optional-filter-list";
import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div`
  margin: ${pxToVw(0)} ${pxToVw(24)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  padding: ${pxToVw(12)};
  width: calc(100% - ${pxToVw(48)});
  border-radius: ${pxToVw(5)};
`;

const FindDesignerRequiredFilter = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <DesignerTypeTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SelectLocation />
      <DropdownSingleSelectItem
        label="근무형태"
        options={["정규직", "스페어(알바)", "무관"]}
      />
      <DropdownSingleSelectItem label="성별" options={["남", "여", "무관"]} />
      <DropdownSingleSelectItem
        label="경력"
        options={["1년 이상", "3년 이상", "5년 이상", "상관없음"]}
      />
      <DropdownMultiSelectItem
        label="미용 라이센스"
        options={["자격증", "면허증", "없음", "상관 없음"]}
      />
      <OptionalFilterList />
    </Container>
  );
};

export default FindDesignerRequiredFilter;
