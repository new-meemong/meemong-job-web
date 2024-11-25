import { ErrorMessage } from "@/components/error-message";
import Link from "next/link";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useJobPostingEditStore } from "@/stores/job-posting-edit-store";
import { useRouter } from "next/navigation";

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

const Button = styled.div`
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
  const router = useRouter();

  const {
    storeName,
    storeAddress,
    role,
    hasDesignerOptionNull,
    hasInternOptionNull,
    setIsOpeningSoon,
  } = useJobPostingEditStore((state) => ({
    storeName: state.storeName,
    storeAddress: state.storeAddress,
    hasDesignerOptionNull: state.hasDesignerOptionNull,
    hasInternOptionNull: state.hasInternOptionNull,
    role: state.role,
    setIsOpeningSoon: state.setIsOpeningSoon,
  }));

  let hasError = false;
  if (role === "디자이너") {
    hasError = !storeAddress && hasDesignerOptionNull;
  } else if (role === "인턴") {
    hasError = !storeAddress && hasInternOptionNull;
  }

  const handleSearchLocation = () => {
    setIsOpeningSoon(false);
    router.push("/search-naver");
  };

  return (
    <Container>
      <Label>
        매장주소 검색*{" "}
        {hasError && <ErrorMessage>{`매장 주소를 검색해주세요.`}</ErrorMessage>}
      </Label>
      <Button onClick={handleSearchLocation}>주소 검색</Button>
      <Label>매장주소*</Label>
      <LocationInfo>
        {storeAddress ? storeAddress : "주소를 검색해주세요"}
      </LocationInfo>
      <Label>매장명*</Label>
      <LocationInfo>
        {storeName ? storeName : "매장을 검색해주세요"}
      </LocationInfo>
    </Container>
  );
};

export default JobPostingEditSearchLocation;
