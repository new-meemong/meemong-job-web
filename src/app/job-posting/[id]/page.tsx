"use client";

import { IMAGE_STORAGE_URL } from "@/apis/consts";
import JobPostingHeader from "@/components/headers/job-posting-header";
import pxToVw from "@/lib/dpi-converter";
import { useJobPostingListStore } from "@/stores/job-posting-list-store";
import { useParams } from "next/navigation";
import styled from "styled-components";
import ImageSlider from "../components/image-slider";
import StoreInfo from "../components/store-info";
import Divider from "../components/divider";
import PostingTitle from "../components/posting-title";
import BasicInfoDesigner from "../components/basic-info-designer";
import BasicInfoIntern from "../components/basic-info-intern";
import DetailInfoDesigner from "../components/detail-info-designer";
import EtcInfo from "../components/etc-info";
import StoreLocation from "../components/store-location";
import BottomFloatingButton from "@/components/buttons/bottom-floating-button";
import DetailInfoIntern from "../components/detail-info-intern";
import { ImageType } from "@/types/image-type";
import { useAuthStore } from "@/stores/auth-store";
import { messageType } from "@/types/send-app-message-type";
import { useEffect, useState } from "react";
import { JobPostingType } from "@/types/job-posting-type";
import CenterSpinner from "@/components/spinners/center-spinner";
import ShareButton from "@/components/buttons/share-button";

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
  padding-left: ${pxToVw(24)};
  padding-right: ${pxToVw(24)};
`;

export default function JobPostingPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobPosting, setJobPosting] = useState<JobPostingType | null>(null);
  const jobPostingId: string = Array.isArray(id) ? id[0] : id;
  const { getJobPosting } = useJobPostingListStore((state) => ({
    jobPostingList: state.jobPostingList,
    getJobPosting: state.getJobPosting
  }));

  const { userId } = useAuthStore((state) => ({
    userId: state.userId
  }));

  const isMine = jobPosting?.userId.toString() === userId;

  useEffect(() => {
    const fetchJobPosting = async () => {
      setIsLoading(true);
      const result = await getJobPosting(jobPostingId);
      if (result) {
        setJobPosting(result);
      }
      setIsLoading(false);
    };
    if (jobPostingId && jobPostingId !== "new") {
      fetchJobPosting();
    }
  }, [jobPostingId]);

  if (isLoading) {
    return <CenterSpinner />;
  }

  if (!jobPosting) {
    return <div>존재하지 않는 구인공고입니다.</div>;
  }

  const { JobPostingsStoreImages }: { JobPostingsStoreImages: ImageType[] } =
    jobPosting;

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
          />
          <Divider />
          <DetailInfoDesigner
            sex={jobPosting.sex}
            isRestrictedAge={jobPosting.isRestrictedAge}
            designerLicenses={jobPosting.designerLicenses}
            storeTypes={jobPosting.storeTypes}
            employeeCount={jobPosting.employeeCount}
            isExistedInternSystem={jobPosting.isExistedInternSystem}
            storeInteriorRenovationAgo={jobPosting.storeInteriorRenovationAgo}
            workCycleTypes={jobPosting.workCycleTypes}
            isExistedEducationSupport={jobPosting.isExistedEducationSupport}
            isExistedMealSupport={jobPosting.isExistedMealSupport}
            mealTime={jobPosting.mealTime}
            isExistedProductSupport={jobPosting.isExistedProductSupport}
            isExistedDormitorySupport={jobPosting.isExistedDormitorySupport}
            salesCommission={jobPosting.salesCommission}
            designerExperienceYearNumber={
              jobPosting.designerExperienceYearNumber
            }
            salesLast3MonthsAvg={jobPosting.salesLast3MonthsAvg}
            subwayAccessibility={jobPosting.subwayAccessibility}
            adminAge={jobPosting.adminAge}
            adminSex={jobPosting.adminSex}
            leaveDayCount={jobPosting.leaveDayCount}
            parkingSpotCount={jobPosting.parkingSpotCount}
            isExistedCleaningSupplier={jobPosting.isExistedCleaningSupplier}
            isExistedTowelSupplier={jobPosting.isExistedTowelSupplier}
            basicCutPrice={jobPosting.basicCutPrice}
            startWorkTime={jobPosting.startWorkTime}
            endWorkTime={jobPosting.endWorkTime}
            storeUrl={jobPosting.storeUrl}
            mainHairDye={jobPosting.mainHairDye}
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
          />
          <Divider />
          <DetailInfoIntern
            sex={jobPosting.sex}
            isRestrictedAge={jobPosting.isRestrictedAge}
            designerLicenses={jobPosting.designerLicenses}
            storeTypes={jobPosting.storeTypes}
            employeeCount={jobPosting.employeeCount}
            isExistedInternSystem={jobPosting.isExistedInternSystem}
            storeInteriorRenovationAgo={jobPosting.storeInteriorRenovationAgo}
            workCycleTypes={jobPosting.workCycleTypes}
            isExistedMealSupport={jobPosting.isExistedMealSupport}
            mealTime={jobPosting.mealTime}
            isExistedProductSupport={jobPosting.isExistedProductSupport}
            isExistedDormitorySupport={jobPosting.isExistedDormitorySupport}
            salesCommission={jobPosting.salesCommission}
            internExperienceYearNumber={jobPosting.internExperienceYearNumber}
            designerPromotionPeriod={jobPosting.designerPromotionPeriod}
            subwayAccessibility={jobPosting.subwayAccessibility}
            adminAge={jobPosting.adminAge}
            adminSex={jobPosting.adminSex}
            leaveDayCount={jobPosting.leaveDayCount}
            parkingSpotCount={jobPosting.parkingSpotCount}
            isExistedCleaningSupplier={jobPosting.isExistedCleaningSupplier}
            isExistedTowelSupplier={jobPosting.isExistedTowelSupplier}
            isOnsiteManager={jobPosting.isOnsiteManager}
            isExistedFourInsurances={jobPosting.isExistedFourInsurances}
            isExistedRetirementPay={jobPosting.isExistedRetirementPay}
            startWorkTime={jobPosting.startWorkTime}
            endWorkTime={jobPosting.endWorkTime}
            storeUrl={jobPosting.storeUrl}
            mainHairDye={jobPosting.mainHairDye}
          />
        </>
      );
    }
  };

  return (
    <Container>
      <JobPostingHeader
        title={"구인공고"}
        jobPostingId={jobPostingId}
        isMine={isMine}
        isEnableButton={userId ? true : false}
      />
      <ImageSlider
        images={
          JobPostingsStoreImages?.map((image) =>
            image?.uri
              ? `${IMAGE_STORAGE_URL}${image?.uri}`
              : "/images/default_profile_image.jpg"
          ) || []
        }
      />
      <ShareButton />
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
            if (typeof window !== "undefined" && window.sendMessageToFlutter) {
              const postUrl = window.location.href;
              const postId = postUrl.split("/").pop() as string;
              const message = {
                type: "job-posting" as messageType,
                postId,
                postUserId: jobPosting.User?.UserID.toString()
              };
              window.sendMessageToFlutter(message);
            } else {
              console.log("sendMessageToFlutter function is not available.");
            }
          }}
        />
      )}
    </Container>
  );
}
