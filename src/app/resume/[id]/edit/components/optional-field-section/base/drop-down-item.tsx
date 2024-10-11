import ArrowDownGreyIcon from "@/components/icons/arrow-down-grey-icon";
import ArrowUpGreyIcon from "@/components/icons/arrow-up-grey-icon";
import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colors.greyDivider};
  padding-top: ${pxToVw(12)};
  padding-bottom: ${pxToVw(12)};
`;

const HeaderContainer = styled.div`
  ${fonts.greyTextEditLabelBold16}
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface DropDownItemProps {
  label: string;
  children: React.ReactNode;
}

const DropDownItem = ({ label, children }: DropDownItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Container>
      <HeaderContainer onClick={() => setIsExpanded((prev) => !prev)}>
        {label}
        {isExpanded ? <ArrowUpGreyIcon /> : <ArrowDownGreyIcon />}
      </HeaderContainer>
      {isExpanded && children}
    </Container>
  );
};

export default DropDownItem;
