import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import SingleInfoItem from "../../../components/details/single-info-item";
import { JobPostingType } from "@/types/job-posting-type";
import SingleInfoLinkItem from "@/components/details/single-info-link-item";
import moment from "moment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${pxToVw(12)};
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

type DetailInfoInternProps = Pick<
  JobPostingType,
  "startWorkTime" | "endWorkTime" | "storeUrl" | "mainHairDye"
>;

const DetailStoreEtcInfoIntern = ({
  startWorkTime,
  endWorkTime,
  storeUrl,
  mainHairDye
}: DetailInfoInternProps) => {
  return (
    <Container>
      <SingleInfoItem
        label={"근무 시간"}
        content={`${
          startWorkTime
            ? moment(startWorkTime, "HH:mm:ss").format("HH:mm")
            : "00:00"
        } ~ ${
          endWorkTime
            ? moment(endWorkTime, "HH:mm:ss").format("HH:mm")
            : "00:00"
        }`}
      />
      <SingleInfoLinkItem
        label={"매장 링크"}
        content={`매장 링크 바로가기 >`}
        url={storeUrl}
      />
      <SingleInfoItem label={"메인 염모제"} content={mainHairDye || ""} />
    </Container>
  );
};

export default DetailStoreEtcInfoIntern;