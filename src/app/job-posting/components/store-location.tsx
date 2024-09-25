import styled from "styled-components";
import InfoTitle from "./info-title";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import { JobPostingType } from "@/types/job-posting-type";

const Container = styled.div``;
const Address = styled.div`
  ${fonts.greyTextSemi16}
  padding-top: ${pxToVw(8)};
  padding-bottom: ${pxToVw(8)};
`;

type StoreLocationProps = Pick<JobPostingType, "storeAddress">;

const StoreLocation = ({ storeAddress }: StoreLocationProps) => {
  return (
    <Container>
      <InfoTitle title={"매장 위치"} />
      <Address>{storeAddress}</Address>
    </Container>
  );
};

export default StoreLocation;
