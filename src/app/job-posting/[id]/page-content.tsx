"use client";

import BasicInfoDesigner from "../components/basic-info-designer";
import BasicInfoIntern from "../components/basic-info-intern";
import BottomFloatingButton from "@/components/buttons/bottom-floating-button";
import DetailPersonInfoDesigner from "../components/detail-person-info-designer";
import DetailPersonInfoIntern from "../components/detail-person-info-intern";
import DetailStoreEtcInfoDesigner from "../components/detail-store-etc-info-designer";
import DetailStoreEtcInfoIntern from "../components/detail-store-etc-info-intern";
import DetailStoreInfoDesigner from "../components/detail-store-info-designer";
import DetailStoreInfoIntern from "../components/detail-store-info-intern";
import Divider from "../components/divider";
import EtcInfo from "../components/etc-info";
import { IMAGE_STORAGE_URL } from "@/apis/consts";
import ImageSlider from "../components/image-slider";
import { ImageType } from "@/types/image-type";
import JobPostingHeader from "@/components/headers/job-posting-header";
import { JobPostingType } from "@/types/job-posting-type";
import PostingTitle from "../components/posting-title";
import StoreFloatingButton from "@/components/buttons/store-floating-button";
import StoreInfo from "../components/store-info";
import StoreLocation from "../components/store-location";
import { messageType } from "@/types/send-app-message-type";
import pxToVw from "@/lib/dpi-converter";
import styled from "styled-components";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Container = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: ${pxToVw(100)};

  @media (min-width: 600px) {
    border: 1px solid grey;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${pxToVw(24)};
`;

export default function PageContent({
  jobPosting,
}: {
  jobPosting: JobPostingType;
}) {
  const { userId } = useAuthStore((state) => ({
    userId: state.userId,
  }));

  const searchParams = useSearchParams(); // 쿼리 파라미터 가져오기
  const source = searchParams.get("source") || undefined;

  const isMine = jobPosting.userId.toString() === userId;

  const { JobPostingsStoreImages }: { JobPostingsStoreImages: ImageType[] } =
    jobPosting;

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 로드 시 스크롤을 최상단으로 이동
  }, []);

  const renderInfo = () => {
    if (jobPosting.role === "디자이너") {
      return (
        <>
          <BasicInfoDesigner
            storeRegion={jobPosting.storeRegion}
            monthlyEducationCount={jobPosting.monthlyEducationCount}
            availableOffDays={jobPosting.availableOffDays}
            settlementAllowance={jobPosting.settlementAllowance}
            incentive={jobPosting.incentive}
            role={jobPosting.role}
          />
          <Divider />
          <DetailPersonInfoDesigner
            sex={jobPosting.sex}
            isRestrictedAge={jobPosting.isRestrictedAge}
            designerLicenses={jobPosting.designerLicenses}
            workType={jobPosting.workType}
            workCycleTypes={jobPosting.workCycleTypes}
            designerExperienceYearNumber={
              jobPosting.designerExperienceYearNumber
            }
            salesLast3MonthsAvg={jobPosting.salesLast3MonthsAvg}
          />
          <Divider />
          <DetailStoreInfoDesigner
            storeTypes={jobPosting.storeTypes}
            employeeCount={jobPosting.employeeCount}
            isExistedInternSystem={jobPosting.isExistedInternSystem}
            storeInteriorRenovationAgo={jobPosting.storeInteriorRenovationAgo}
            isExistedEducationSupport={jobPosting.isExistedEducationSupport}
            isExistedMealSupport={jobPosting.isExistedMealSupport}
            mealTime={jobPosting.mealTime}
            isExistedProductSupport={jobPosting.isExistedProductSupport}
            isExistedDormitorySupport={jobPosting.isExistedDormitorySupport}
            salesCommission={jobPosting.salesCommission}
            subwayAccessibility={jobPosting.subwayAccessibility}
            adminAge={jobPosting.adminAge}
            adminSex={jobPosting.adminSex}
            leaveDayCount={jobPosting.leaveDayCount}
            parkingSpotCount={jobPosting.parkingSpotCount}
            isExistedCleaningSupplier={jobPosting.isExistedCleaningSupplier}
            isExistedTowelSupplier={jobPosting.isExistedTowelSupplier}
            isOnsiteManager={jobPosting.isOnsiteManager}
            basicCutPrice={jobPosting.basicCutPrice}
          />
          <Divider />
          <DetailStoreEtcInfoDesigner
            startWorkTime={jobPosting.startWorkTime}
            endWorkTime={jobPosting.endWorkTime}
            storeUrl={jobPosting.storeUrl}
            mainHairDye={jobPosting.mainHairDye}
            source={source}
          />
        </>
      );
    } else if (jobPosting.role === "인턴") {
      return (
        <>
          <BasicInfoIntern
            storeRegion={jobPosting.storeRegion}
            monthlyEducationCount={jobPosting.monthlyEducationCount}
            educationCost={jobPosting.educationCost}
            availableOffDays={jobPosting.availableOffDays}
            internSalary={jobPosting.internSalary}
            role={jobPosting.role}
          />
          <Divider />
          <DetailPersonInfoIntern
            sex={jobPosting.sex}
            isRestrictedAge={jobPosting.isRestrictedAge}
            designerLicenses={jobPosting.designerLicenses}
            workType={jobPosting.workType}
            workCycleTypes={jobPosting.workCycleTypes}
            internExperienceYearNumber={jobPosting.internExperienceYearNumber}
            isExistedFourInsurances={jobPosting.isExistedFourInsurances}
            isExistedRetirementPay={jobPosting.isExistedRetirementPay}
          />
          <Divider />
          <DetailStoreInfoIntern
            storeTypes={jobPosting.storeTypes}
            employeeCount={jobPosting.employeeCount}
            isExistedInternSystem={jobPosting.isExistedInternSystem}
            storeInteriorRenovationAgo={jobPosting.storeInteriorRenovationAgo}
            isExistedMealSupport={jobPosting.isExistedMealSupport}
            mealTime={jobPosting.mealTime}
            isExistedProductSupport={jobPosting.isExistedProductSupport}
            isExistedDormitorySupport={jobPosting.isExistedDormitorySupport}
            salesCommission={jobPosting.salesCommission}
            designerPromotionPeriod={jobPosting.designerPromotionPeriod}
            subwayAccessibility={jobPosting.subwayAccessibility}
            adminAge={jobPosting.adminAge}
            adminSex={jobPosting.adminSex}
            leaveDayCount={jobPosting.leaveDayCount}
            parkingSpotCount={jobPosting.parkingSpotCount}
            isExistedCleaningSupplier={jobPosting.isExistedCleaningSupplier}
            isExistedTowelSupplier={jobPosting.isExistedTowelSupplier}
            isOnsiteManager={jobPosting.isOnsiteManager}
          />
          <Divider />
          <DetailStoreEtcInfoIntern
            startWorkTime={jobPosting.startWorkTime}
            endWorkTime={jobPosting.endWorkTime}
            storeUrl={jobPosting.storeUrl}
            mainHairDye={jobPosting.mainHairDye}
            source={source}
          />
        </>
      );
    }
  };
  return (
    <Container>
      <JobPostingHeader
        title={"구인공고"}
        jobPostingId={jobPosting.id}
        isMine={isMine}
        isEnableButton={userId ? true : false}
      />
      <ImageSlider
        images={
          JobPostingsStoreImages?.map((image) =>
            image?.uri
              ? `${IMAGE_STORAGE_URL}${image?.uri}`
              : "/images/default_profile_image.jpg",
          ) || []
        }
      />

      <ContentContainer>
        <StoreInfo
          storeImage={
            JobPostingsStoreImages && JobPostingsStoreImages.length !== 0
              ? IMAGE_STORAGE_URL + JobPostingsStoreImages[0]?.uri
              : "/images/default_profile_image.jpg"
          }
          storeName={jobPosting.storeName}
          storeRegion={jobPosting.storeRegion}
        />
        <Divider />
        <PostingTitle postingTitle={jobPosting.postingTitle} />
        <Divider />
        {renderInfo()}
        <Divider />
        <EtcInfo
          storeName={jobPosting.storeName}
          description={jobPosting.description}
        />
        <Divider />
        <StoreLocation storeAddress={jobPosting.storeAddress} />
      </ContentContainer>
      {userId && !isMine && (
        <BottomFloatingButton
          title="지원하기"
          onClick={() => {
            if (typeof window !== "undefined" && window.startChat) {
              const postUrl = window.location.href;
              const postId = postUrl.split("/").pop() as string;
              const message = {
                type: "job-posting" as messageType,
                postId,
                postUserId: jobPosting.User?.UserID.toString(),
              };
              window.startChat(message);
            } else {
              console.log("startChat function is not available.");
            }
          }}
        />
      )}
      {!userId && <StoreFloatingButton title={"어플 다운 후 지원하기"} />}
    </Container>
  );
}
