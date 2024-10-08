import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";
import { useState } from "react";
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

const Caption = styled.div`
  ${fonts.purplePrimarySemi12}
  margin-bottom: ${pxToVw(8)};
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

interface Option<T> {
  key: T;
  value: string;
}

interface OptionalMultiDropdownFilterProps<T> {
  label: string;
  options: Option<T>[];
  selectedOptions: T[];
  onSelect: (option: T) => void;
}

const OptionalMultiDropdownFilter = <T,>({
  label,
  options,
  selectedOptions,
  onSelect
}: OptionalMultiDropdownFilterProps<T>) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (optionKey: T) => {
    onSelect(optionKey);
  };
  console.log("moonsae selectedOptions", selectedOptions);
  return (
    <Container>
      {isExpanded ? (
        <ExpandedContainer>
          <HeaderContainer onClick={toggleExpand}>
            <HeaderLabelContainer>{label}</HeaderLabelContainer>
            <ArrowUpGreyIcon />
          </HeaderContainer>
          <Caption>복수 선택 가능</Caption>
          <OptionContainer>
            {options.map((option, index) => (
              <OptionItem
                key={index}
                $isSelected={selectedOptions.includes(option.key)}
                onClick={() => handleOptionClick(option.key)}
              >
                {option.value}
              </OptionItem>
            ))}
          </OptionContainer>
        </ExpandedContainer>
      ) : (
        <UnexpandItemContainer onClick={toggleExpand}>
          <UnexpandLabelContainer>{label}</UnexpandLabelContainer>
          <UnexpandContentContainer>
            <UnexpandContent>{selectedOptions.join(", ")}</UnexpandContent>
          </UnexpandContentContainer>
          <ArrowDownGreyIcon />
        </UnexpandItemContainer>
      )}
    </Container>
  );
};

export default OptionalMultiDropdownFilter;
