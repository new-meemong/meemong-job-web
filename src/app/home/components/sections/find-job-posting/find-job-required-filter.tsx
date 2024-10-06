import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import styled from "styled-components";
import DesignerTypeTab from "../../filters/designer-type-tab";
import { useState } from "react";
import SelectLocation from "../../filters/select-location";
import DropdownSingleSelectItem from "@/components/drop-downs/dropdown-single-select-item";
import DropdownMultiSelectItem from "@/components/drop-downs/dropdown-multi-select-item";

const Container = styled.div`
  margin: ${pxToVw(0)} ${pxToVw(24)};
  border: ${pxToVw(1)} solid ${colors.purplePrimary};
  padding: ${pxToVw(12)};
  width: calc(100% - ${pxToVw(48)});
  border-radius: ${pxToVw(5)};
`;

const FindJobRequiredFilter = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <DesignerTypeTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SelectLocation />
      <DropdownSingleSelectItem
        label="교육"
        options={["월 1회 이상", "월 2회 이상", "월 3회 이상", "상관없음"]}
      />
      <DropdownMultiSelectItem
        label="희망 휴무"
        options={["월", "화", "수", "목", "금", "토", "일", "상관 없음"]}
      />
      <DropdownSingleSelectItem
        label="정착 지원금"
        options={[
          "179만원 이하",
          "180만원 이상",
          "210만원 이상",
          "240만원 이상",
          "270만원 이상",
          "300만원 이상",
          "330만원 이상",
          "360만원 이상",
          "상관없음"
        ]}
      />
      <DropdownSingleSelectItem
        label="인센티브"
        options={[
          "29% 이하",
          "30% 이상",
          "35% 이상",
          "40% 이상",
          "45% 이상",
          "50% 이상",
          "60% 이상",
          "70% 이상",
          "상관없음"
        ]}
        tooltip={`월 매출 1,000만원 시\n지급되는 인센티브를 뜻합니다.`}
      />
    </Container>
  );
};

export default FindJobRequiredFilter;
