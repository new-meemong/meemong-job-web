import OptionalDropdownItem from "@/components/optional-dropdown-item";
import OptionalDropdownItemExpandedHeader from "@/components/optional-dropdown-item-expanded-header";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div``;

const ExpandedContainer = styled.div``;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: 5px; /* 아이템 간의 간격 */
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};

  ${(props) => (props.$isSelected ? fonts.purplePrimary12 : fonts.greySemi12)}
`;

const NoticeMultiple = styled.div`
  padding-bottom: 8px;
  ${fonts.purplePrimary12}
`;

const OptionalFilter3 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const label = "희망 휴무일";
  const optionList = ["월", "화", "수", "목", "금", "토", "일", "상관없음"];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option: string) => {
    if (option === "상관없음") {
      setSelectedOptions(["상관없음"]);
    } else {
      setSelectedOptions((prevOptions) => {
        if (prevOptions.includes(option)) {
          // 선택 취소
          return prevOptions.filter((item) => item !== option);
        } else {
          // "상관없음"이 선택되어 있으면 해제하고 새로운 옵션 추가
          return prevOptions.includes("상관없음")
            ? [option]
            : [...prevOptions, option];
        }
      });
    }
  };

  return (
    <Container>
      {isExpanded ? (
        <ExpandedContainer>
          <OptionalDropdownItemExpandedHeader
            label={label}
            onClick={toggleExpanded}
          />
          <NoticeMultiple>복수 선택 가능</NoticeMultiple>
          <OptionContainer>
            {optionList.map((option, index) => (
              <OptionItem
                key={index}
                $isSelected={selectedOptions.includes(option)}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </OptionItem>
            ))}
          </OptionContainer>
        </ExpandedContainer>
      ) : (
        <OptionalDropdownItem
          label={label}
          content={selectedOptions.join(", ") || "상관없음"}
          onClick={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default OptionalFilter3;