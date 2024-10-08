import OptionalDropdownItem from "@/app/home/components/filters/options-filters/options-filter-expand-items/optional-dropdown-item";
import OptionalDropdownItemExpandedHeader from "@/app/home/components/filters/options-filters/options-filter-expand-items/optional-dropdown-item-expanded-header";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";
import { useState } from "react";
import styled from "styled-components";
import pxToVw from "@/lib/dpi-converter";

const Container = styled.div``;

const ExpandedContainer = styled.div``;

const OptionContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: ${pxToVw(5)}; /* 아이템 간의 간격 */
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

const OptionalFilter2 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("상관없음");

  const label = "학력";
  const optionList = [
    "미용고등학교 졸업",
    "미용대학교 졸업",
    "일반고등학교 졸업",
    "일반대학교 졸업",
    "해당없음",
    "상관없음"
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Container>
      {isExpanded ? (
        <ExpandedContainer>
          <OptionalDropdownItemExpandedHeader
            label={label}
            onClick={toggleExpanded}
          />
          <OptionContainer>
            {optionList.map((option, index) => (
              <OptionItem
                key={index}
                $isSelected={option === selectedOption}
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
          content={selectedOption}
          onClick={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default OptionalFilter2;
