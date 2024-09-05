import pxToVw from "@/lib/dpi-converter";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: ${pxToVw(8)};
`;

const Label = styled.span`
  ${fonts.greyTextEditLabelBold16}
  margin-top: ${pxToVw(12)};
`;

const Button = styled(Link)`
  ${fonts.purplePrimaryBold14}
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${pxToVw(8)};
  height: ${pxToVw(40)};
  border-radius: ${pxToVw(4)};
  background-color: ${colors.purpleBackgroundActive};
`;

const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  padding: ${pxToVw(12)};
  ${fonts.greySemi12}
  height: ${pxToVw(40)};
  margin-top: ${pxToVw(8)};
  border-radius: ${pxToVw(4)};
  background-color: ${colors.greyLocationBackground};
`;

const JobPostingEditSearchLocation = () => {
  return (
    <Container>
      <Label>매장주소 검색*</Label>
      <Button href="">주소 검색</Button>
      <Label>매장주소*</Label>
      <LocationInfo>주소를 검색해주세요</LocationInfo>
      <Label>매장명*</Label>
      <LocationInfo>매장을 검색해주세요</LocationInfo>
    </Container>
  );
};

export default JobPostingEditSearchLocation;
