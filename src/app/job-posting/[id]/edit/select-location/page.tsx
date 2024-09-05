"use client";

import PageContainer from "@/components/page-container";
import styled from "styled-components";
import BottomArea from "./components/bottom-area";
import { colors } from "@/styles/colors";
import LocationHeader from "@/components/headers/location-header";
import { useState } from "react";
import CheckboxSelectIcon from "@/components/icons/checkbox-select-icon";
import CheckboxUnselectIcon from "@/components/icons/checkbox-unselect-icon";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: ${pxToVw(20)};
  gap: ${pxToVw(10)};
`;

const LeftScrollContainer = styled.div`
  width: ${pxToVw(107)};
  overflow-y: auto;
  height: calc(100vh - ${pxToVw(52)} - ${pxToVw(106)});
  padding-top: ${pxToVw(16)};
`;
const RightScrollContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100vh - ${pxToVw(52)} - ${pxToVw(106)});
  padding-top: ${pxToVw(16)};
`;

interface ListItemProps {
  $selected: boolean;
}

const LeftListItem = styled.div<ListItemProps>`
  width: ${pxToVw(107)};
  height: ${pxToVw(69)};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${(props) => (props.$selected ? colors.purplePrimary : colors.greyLine2)};
  ${(props) => (props.$selected ? fonts.blackBold14 : fonts.greyNormal14)};
`;

const RightListItem = styled.div<ListItemProps>`
  width: ${pxToVw(233)};
  height: ${pxToVw(40)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: ${pxToVw(5)};
  padding: 0 ${pxToVw(20)};
  background-color: ${(props) =>
    props.$selected ? colors.purpleSecondary : colors.white};
  ${(props) => (props.$selected ? fonts.blackBold14 : fonts.greyNormal14)};
`;

export default function SelectLocationPage() {
  const list1 = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종"
  ];
  const list2 = [
    "서울 전체",
    "종로구",
    "중구",
    "용산구",
    "성동구",
    "광진구",
    "동대문구",
    "중랑구",
    "성북구",
    "강북구",
    "도봉구",
    "노원구",
    "은평구",
    "서대문구",
    "마포구",
    "양천구",
    "강서구",
    "구로구",
    "금천구",
    "영등포구",
    "동작구",
    "관악구",
    "서초구",
    "강남구",
    "송파구",
    "강동구"
  ];

  const [selectedLeftItem, setSelectedLeftItem] = useState<string | null>(null);
  const [selectedRightItems, setSelectedRightItems] = useState<string[]>([]);

  const handleLeftItemClick = (item: string) => {
    setSelectedLeftItem(item);
  };

  const handleRightItemClick = (item: string) => {
    setSelectedRightItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem !== item
        );
      } else if (prevSelectedItems.length < 3) {
        return [...prevSelectedItems, item];
      } else {
        return prevSelectedItems; // 더 이상 추가되지 않도록 현재 상태 유지
      }
    });
  };

  return (
    <PageContainer>
      <LocationHeader />
      <ContentContainer>
        <LeftScrollContainer>
          {list1.map((item, index) => {
            const isSelected = item === selectedLeftItem;
            return (
              <LeftListItem
                key={index}
                $selected={isSelected}
                onClick={() => handleLeftItemClick(item)}
              >
                {item}
              </LeftListItem>
            );
          })}
        </LeftScrollContainer>
        <RightScrollContainer>
          {list2.map((item, index) => {
            const isSelected = selectedRightItems.includes(item);

            return (
              <RightListItem
                key={index}
                $selected={isSelected}
                onClick={() => handleRightItemClick(item)}
              >
                {item}
                {isSelected ? <CheckboxSelectIcon /> : <CheckboxUnselectIcon />}
              </RightListItem>
            );
          })}
        </RightScrollContainer>
      </ContentContainer>
      <BottomArea selectedCount={selectedRightItems.length} />
    </PageContainer>
  );
}
