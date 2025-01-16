"use client";

import { Suspense, useEffect, useState } from "react";
import { siNmShort, siSggList } from "@/types/location-type";
import { useRouter, useSearchParams } from "next/navigation";

import BottomArea from "./components/bottom-area";
import CheckboxSelectIcon from "@/components/icons/checkbox-select-icon";
import CheckboxUnselectIcon from "@/components/icons/checkbox-unselect-icon";
import LocationHeader from "@/components/headers/LocationHeader";
import PageContainer from "@/components/page-container";
import { TargetType } from "./types/target-type";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import toast from "react-hot-toast";

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

interface SiNmShort {
  key: string;
  value: string;
}

function SelectLocationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const target = searchParams.get("target");

  const [selectedLeftItem, setSelectedLeftItem] = useState<SiNmShort>(
    siNmShort[0],
  );
  const [selectedRightItems, setSelectedRightItems] = useState<
    { key: string; value: string }[]
  >([]);
  const subList = siSggList[selectedLeftItem.key];

  useEffect(() => {
    const validTargets: TargetType[] = [
      "jobPostingEdit",
      "resumeEdit",
      "jobPostingList",
      "resumeList",
    ];

    if (!validTargets.includes(target as TargetType)) {
      toast("유효하지 않은 target 값입니다.");
      router.back();
    }
  }, [target]);

  const handleLeftItemClick = (item: SiNmShort) => {
    console.log(item);
    setSelectedLeftItem(item);
  };

  const handleRightItemClick = (item: { key: string; value: string }) => {
    setSelectedRightItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.some(
        (selectedItem) =>
          selectedItem.key === item.key && selectedItem.value === item.value,
      );

      const currentSiItems = prevSelectedItems.filter((selectedItem) =>
        selectedItem.key.startsWith(item.key.split(" ")[0]),
      );

      // "전체"를 클릭했을 때 해당 시의 다른 항목 해제
      if (item.value.includes("전체")) {
        if (isItemSelected) {
          return prevSelectedItems.filter(
            (selectedItem) => !selectedItem.value.includes("전체"),
          ); // "전체"를 다시 클릭하면 해당 시의 "전체"만 해제
        } else {
          // "전체" 선택 시 해당 시의 다른 항목들 해제하고 "전체"만 선택, 최대 3개까지 선택 가능
          if (prevSelectedItems.length - currentSiItems.length + 1 > 3) {
            return prevSelectedItems; // 이미 3개 이상 선택되어 있으면 추가 불가
          }
          return [
            ...prevSelectedItems.filter(
              (selectedItem) => !currentSiItems.includes(selectedItem),
            ),
            item,
          ];
        }
      }

      // "전체" 이외의 항목 선택 시 해당 시의 "전체" 항목 해제
      if (
        currentSiItems.some((selectedItem) =>
          selectedItem.value.includes("전체"),
        )
      ) {
        if (prevSelectedItems.length - 1 + 1 > 3) {
          return prevSelectedItems; // 이미 3개 이상 선택되어 있으면 추가 불가
        }
        return [
          ...prevSelectedItems.filter(
            (selectedItem) => !currentSiItems.includes(selectedItem),
          ),
          item,
        ]; // "전체"가 선택된 상태에서 다른 항목을 클릭하면 "전체" 해제
      }

      // 기존 항목 추가/제거 로직
      if (isItemSelected) {
        return prevSelectedItems.filter(
          (selectedItem) => selectedItem.key !== item.key,
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
          {siNmShort.map((item) => {
            const isSelected = item.key === selectedLeftItem.key;

            return (
              <LeftListItem
                key={item.key}
                $selected={isSelected}
                onClick={() => handleLeftItemClick(item)}
              >
                {item.value}
              </LeftListItem>
            );
          })}
        </LeftScrollContainer>
        <RightScrollContainer>
          {Array.isArray(subList) &&
            subList.map((item: { key: string; value: string }, index) => {
              const isSelected = selectedRightItems.some(
                (selectedItem) =>
                  selectedItem.key === item.key &&
                  selectedItem.value === item.value,
              );
              return (
                <RightListItem
                  key={index}
                  $selected={isSelected}
                  onClick={() => handleRightItemClick(item)}
                >
                  {item.value}
                  {isSelected ? (
                    <CheckboxSelectIcon />
                  ) : (
                    <CheckboxUnselectIcon />
                  )}
                </RightListItem>
              );
            })}
        </RightScrollContainer>
      </ContentContainer>
      <BottomArea
        selectedLeftItem={selectedLeftItem}
        selectedRightItems={selectedRightItems}
        target={target as TargetType}
      />
    </PageContainer>
  );
}

export default function SelectLocationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SelectLocationContent />
    </Suspense>
  );
}
