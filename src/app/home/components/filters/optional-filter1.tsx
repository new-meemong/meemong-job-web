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

const OptionalFilter1 = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState("상관없음");

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
            label={"학력"}
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
          label={"학력"}
          content={"상관없음"}
          onClick={toggleExpanded}
        />
      )}
    </Container>
  );
};

export default OptionalFilter1;
