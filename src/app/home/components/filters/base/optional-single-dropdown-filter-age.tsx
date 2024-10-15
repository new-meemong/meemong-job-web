import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";
import ArrowUpGreyIcon from "@/components/icons/arrow-up-grey-icon";
import ArrowDownGreyIcon from "@/components/icons/arrow-down-grey-icon";

const Container = styled.div``;

const ExpandedContainer = styled.div``;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: ${pxToVw(5)}; /* 아이템 간의 간격 */
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  align-items: center;
  margin-top: ${pxToVw(6)};
  margin-bottom: ${pxToVw(6)};
  justify-content: space-between;
`;

const HeaderLabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: ${pxToVw(120)};
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${pxToVw(90)};
  height: ${pxToVw(34)};
  border-radius: ${pxToVw(4)};
  border: ${pxToVw(1)} solid
    ${(props) => (props.$isSelected ? colors.purplePrimary : colors.grey)};

  ${(props) =>
    props.$isSelected ? fonts.purplePrimarySemi12 : fonts.greySemi12}
`;

const UnexpandItemContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${pxToVw(34)};
  align-items: center;
  margin-top: ${pxToVw(6)};
  margin-bottom: ${pxToVw(6)};
`;

const UnexpandLabelContainer = styled.div`
  ${fonts.purplePrimarySemi14}
  width: ${pxToVw(120)};
`;

const UnexpandContentContainer = styled.div`
  width: ${pxToVw(168)};
`;

const UnexpandContent = styled.div`
  ${fonts.purplePrimaryBold14}
`;

const Caption = styled.div`
  ${fonts.purplePrimarySemi12}
  margin-bottom: ${pxToVw(8)};
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToVw(4)};
  margin-top: ${pxToVw(8)};
  padding-bottom: ${pxToVw(8)};
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: ${pxToVw(24)};
  height: ${pxToVw(24)};
  cursor: pointer;
  appearance: none;
  border: ${pxToVw(2)} solid ${colors.grey};
  border-radius: ${pxToVw(2)};

  &:checked {
    background-color: inherit; /* 체크된 상태에서도 배경 유지 */
  }

  &:checked::before {
    content: "✓"; /* 체크 아이콘 */
    display: block;
    text-align: center;
    color: ${colors.purplePrimary}; /* 체크 아이콘 색상 */
    font-size: ${pxToVw(20)};
    line-height: ${pxToVw(24)};
  }
`;

const CheckboxLabel = styled.span`
  ${fonts.greyTextEditLabelSemi12}
  padding-left: ${pxToVw(4)};
`;

interface Option<T> {
  key: T;
  value: string;
}

interface OptionalSingleDropdownFilterProps<T> {
  label: string;
  options: Option<T>[];
  selectedOption: T | null;
  onSelect: (option: T | null) => void;
  caption?: string;
  selectedSubOption?: T | null;
  onSelectSubOption?: (option: T | null) => void;
}

const OptionalSingleDropdownFilterAge = <T extends string | boolean>({
  label,
  options,
  selectedOption,
  onSelect,
  caption,

  onSelectSubOption
}: OptionalSingleDropdownFilterProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (optionKey: T) => {
    if (optionKey === selectedOption) {
      onSelect(null); // 동일한 항목을 클릭하면 선택 해제
    } else {
      onSelect(optionKey);
    }
  };

  const handleSubOptionClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (!onSelectSubOption) return;
    const isChecked = event.target.checked;

    if (isChecked) {
      onSelectSubOption("true" as T);
    } else {
      onSelectSubOption("false" as T);
    }
  };
  console.log("moonsae selectedOption", selectedOption);
  return (
    <Container>
      {isExpanded ? (
        <ExpandedContainer>
          <HeaderContainer onClick={toggleExpand}>
            <HeaderLabelContainer>{label}</HeaderLabelContainer>
            <ArrowUpGreyIcon />
          </HeaderContainer>
          {caption && <Caption>{caption}</Caption>}
          <OptionContainer>
            {options.map((option, index) => (
              <OptionItem
                key={index}
                $isSelected={option.key === selectedOption}
                onClick={() => handleOptionClick(option.key)}
              >
                {option.value}
              </OptionItem>
            ))}
          </OptionContainer>
          {selectedOption === "true" && (
            <CheckboxContainer>
              <Checkbox onChange={handleSubOptionClick} />
              <CheckboxLabel>{"중년(40대이상) 가능"}</CheckboxLabel>
            </CheckboxContainer>
          )}
        </ExpandedContainer>
      ) : (
        <UnexpandItemContainer onClick={toggleExpand}>
          <UnexpandLabelContainer>{label}</UnexpandLabelContainer>
          <UnexpandContentContainer>
            <UnexpandContent>
              {selectedOption === "true"
                ? "나이 제한"
                : selectedOption === "false"
                ? "나이 무관"
                : selectedOption}
            </UnexpandContent>
          </UnexpandContentContainer>
          <ArrowDownGreyIcon />
        </UnexpandItemContainer>
      )}
    </Container>
  );
};

export default OptionalSingleDropdownFilterAge;
