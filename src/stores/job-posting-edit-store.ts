import { postJobPostings } from "@/apis/job-postings";
import {
  AdminAgeKey,
  AdminSexKey,
  AvailableOffDaysKey,
  BasicCutPriceKey,
  DescriptionKey,
  DesignerExperienceYearNumberKey,
  DesignerLicensesKey,
  DesignerPromitionPeriodKey,
  EducationCostKey,
  EmployeeCountKey,
  EndWorkTimeKey,
  IncentiveKey,
  InternExperienceYearNumberKey,
  InternSalaryKey,
  IsExistedCleaningSupplierKey,
  IsExistedDormitorySupportKey,
  IsExistedEducationSupportKey,
  IsExistedFourInsurancesKey,
  isExistedInternSystemKey,
  IsExistedMealSupportKey,
  IsExistedProductSupportKey,
  IsExistedRetirementPayKey,
  IsExistedTowelSupplierKey,
  IsOnsiteManagerKey,
  IsPossibleMiddleAgeKey,
  IsRestrictedAgeKey,
  LeaveDayCountKey,
  MainHairDyeKey,
  MealTimeKey,
  MonthlyEducationDesignerCountKey,
  MonthlyEducationInternCountKey,
  ParkingSpotCountKey,
  RoleKey,
  SalesCommissionKey,
  SalesLast3MonthsAvgKey,
  SettlementAllowanceKey,
  SexKey,
  StartWorkTimeKey,
  StoreUrlKey,
  StoreInteriorRenovationAgoKey,
  StoreTypesKey,
  SubwayAccessibilityKey,
  WorkTypeKey,
  WorkCycleTypeKey
} from "@/types/job-posting-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type StoreInfoType = {
  title: string;
  address: string;
};

type JobPostingsStoreImageType = {
  uri: string;
  thumbnailUri: string;
};
type JobPostingEditState = {
  postingTitle: string | null;
  storeName: string | null;
  storeRegion: string | null;
  storeRegionSiName: string | null;
  storeAddress: string | null;

  // 기본 정보
  role: RoleKey;
  _postingRegions: { key: string; value: string }[]; // 노출 지역, 내부 관리용
  postingRegions: string | null; // 노출 지역 (콤마로 구분)
  postingRegionSiNames: string | null; // 노출 지역의 시 (콤마로 구분)
  monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey | null;
  monthlyEducationInternCount: MonthlyEducationInternCountKey | null;
  availableOffDays: AvailableOffDaysKey[];
  settlementAllowance: SettlementAllowanceKey | null;
  incentive: IncentiveKey | null;

  // 상세 정보
  sex: SexKey | null;
  isRestrictedAge: IsRestrictedAgeKey | null;
  isPossibleMiddleAge: IsPossibleMiddleAgeKey | null;
  designerLicenses: DesignerLicensesKey[];
  storeTypes: StoreTypesKey[];
  employeeCount: EmployeeCountKey | null;
  isExistedInternSystem: isExistedInternSystemKey | null;
  storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null;
  workType: WorkTypeKey | null;
  workCycleType: WorkCycleTypeKey[];
  isExistedEducationSupport: IsExistedEducationSupportKey | null;
  isExistedMealSupport: IsExistedMealSupportKey | null;
  mealTime: MealTimeKey | null;
  isExistedProductSupport: IsExistedProductSupportKey | null;
  isExistedDormitorySupport: IsExistedDormitorySupportKey | null;
  salesCommission: SalesCommissionKey | null;
  designerExperienceYearNumber: DesignerExperienceYearNumberKey | null;
  salesLast3MonthsAvg: SalesLast3MonthsAvgKey | null;
  subwayAccessibility: SubwayAccessibilityKey | null;
  adminAge: AdminAgeKey | null;
  adminSex: AdminSexKey | null;
  leaveDayCount: LeaveDayCountKey | null;
  parkingSpotCount: ParkingSpotCountKey | null;
  isExistedCleaningSupplier: IsExistedCleaningSupplierKey | null;
  isExistedTowelSupplier: IsExistedTowelSupplierKey | null;

  // other form fields
  basicCutPrice: BasicCutPriceKey | null;

  // imageUrlList
  jobPostingsStoreImages: JobPostingsStoreImageType[];

  // etc options
  startWorkTime: StartWorkTimeKey | null;
  endWorkTime: EndWorkTimeKey | null;
  storeUrl: StoreUrlKey | null;
  mainHairDie: MainHairDyeKey | null;
  description: DescriptionKey | null;

  // intern
  educationCost: EducationCostKey | null;
  internSalary: InternSalaryKey | null;
  designerPromitionPeriod: DesignerPromitionPeriodKey | null;
  internExperienceYearNumber: InternExperienceYearNumberKey | null;
  isOnsiteManager: IsOnsiteManagerKey | null;
  isExistedFourInsurances: IsExistedFourInsurancesKey | null;
  isExistedRetirementPay: IsExistedRetirementPayKey | null;

  // 에러 표시
  hasDesignerOptionNull: boolean;
  hasInternOptionNull: boolean;
};

type JobPostingEditActions = {
  setPostingTitle: (title: string) => void;
  setRole: (role: RoleKey) => void;
  setMonthlyEducationDesignerCount: (
    monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey
  ) => void;
  setMonthlyEducationInternCount: (
    monthlyEducationInternCount: MonthlyEducationInternCountKey
  ) => void;
  setAvailableOffDays: (day: AvailableOffDaysKey) => void;
  setSettlementAllowance: (settlementAllowance: SettlementAllowanceKey) => void;
  setIncentive: (incentive: IncentiveKey) => void;
  setSex: (sex: SexKey) => void;
  setIsRestrictedAge: (isRestrictedAge: IsRestrictedAgeKey | null) => void;
  setIsPossibleMiddleAge: (isPossibleMiddleAge: IsPossibleMiddleAgeKey) => void;
  setDesignerLicenses: (designerLicense: DesignerLicensesKey) => void;
  setStoreTypes: (store: StoreTypesKey) => void;
  setEmployeeCount: (employeeCount: EmployeeCountKey) => void;
  setIsExistedInternSystem: (
    isExistedInternSystem: isExistedInternSystemKey
  ) => void;
  setStoreInteriorRenovationAgo: (
    storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null
  ) => void;
  setWorkType: (workType: WorkTypeKey) => void;
  setWorkCycle: (workCycle: WorkCycleTypeKey) => void;
  setIsExistedEducationSupport: (
    isExistedEducationSupport: IsExistedEducationSupportKey | null
  ) => void;
  setIsExistedMealSupport: (
    isExistedMealSupport: IsExistedMealSupportKey | null
  ) => void;
  setMealTime: (mealTime: MealTimeKey) => void;
  setIsExistedProductSupport: (
    isExistedProductSupport: IsExistedProductSupportKey | null
  ) => void;
  setIsExistedDormitorySupport: (
    isExistedDormitorySupport: IsExistedDormitorySupportKey | null
  ) => void;
  setSalesCommission: (salesCommission: SalesCommissionKey) => void;
  setDesignerExperienceYearNumber: (
    designerExperienceYearNumber: DesignerExperienceYearNumberKey
  ) => void;
  setSalesLast3MonthsAvg: (salesLast3MonthsAvg: SalesLast3MonthsAvgKey) => void;
  setSubwayAccessibility: (subwayAccessibility: SubwayAccessibilityKey) => void;
  setAdminAge: (adminAge: AdminAgeKey) => void;
  setAdminSex: (adminSex: AdminSexKey) => void;
  setLeaveDayCount: (leaveDayCount: LeaveDayCountKey) => void;
  setParkingSpotCount: (parkingSpotCount: ParkingSpotCountKey) => void;
  setIsExistedCleaningSupplier: (
    isExistedCleaningSupplier: IsExistedCleaningSupplierKey | null
  ) => void;
  setIsExistedTowelSupplier: (
    isExistedTowelSupplier: IsExistedTowelSupplierKey | null
  ) => void;
  setBasicCutPrice: (basicCutPrice: BasicCutPriceKey | null) => void;
  setStartWorkTime: (startWorkTime: string | null) => void;
  setEndWorkTime: (endWorkTime: string | null) => void;
  setStoreUrl: (storeUrl: StoreUrlKey | null) => void;
  setMainHairDie: (mainHaireDie: MainHairDyeKey | null) => void;
  setDescription: (description: DescriptionKey | null) => void;
  setEducationCost: (educationCost: EducationCostKey | null) => void;
  setInternSalary: (internSalary: InternSalaryKey | null) => void;
  setDesignerPromitionPeriod: (
    designerPromitionPeriod: DesignerPromitionPeriodKey | null
  ) => void;
  setInternExperienceYearNumber: (
    internExperienceYearNumber: InternExperienceYearNumberKey | null
  ) => void;
  setIsOnsiteManager: (isOnsiteManager: IsOnsiteManagerKey | null) => void;
  setIsExistedFourInsurances: (
    isExistedFourInsurances: IsExistedFourInsurancesKey | null
  ) => void;
  setIsExistedRetirementPay: (
    isExistedRetirementPay: IsExistedRetirementPayKey | null
  ) => void;

  // 공고 제출
  submitDesignerJobPosting: () => Promise<boolean>;
  submitInternJobPosting: () => Promise<boolean>;

  // 노출지역
  setPostingRegions: (
    selectedRightItems: { key: string; value: string }[]
  ) => void;

  setHasDesignerOptionNull: (hasDesignerOptionNull: boolean) => void;
  setHasInternOptionNull: (hasInternOptionNull: boolean) => void;
  setJobPostingsStoreImages: (images: JobPostingsStoreImageType[]) => void;
  setStoreRegion: (storeRegion: StoreInfoType) => void;
};

const defaultJobPostingEditState: JobPostingEditState = {
  postingTitle: null,
  storeName: null,
  storeRegion: null,
  storeRegionSiName: null,
  storeAddress: null,
  role: "디자이너",
  monthlyEducationDesignerCount: null,
  monthlyEducationInternCount: null,
  availableOffDays: [],
  settlementAllowance: null,
  incentive: null,
  sex: null,
  isRestrictedAge: null,
  isPossibleMiddleAge: null,
  designerLicenses: [],
  storeTypes: [],
  employeeCount: null,
  isExistedInternSystem: null,
  storeInteriorRenovationAgo: null,
  workType: null,
  workCycleType: [],
  isExistedEducationSupport: null,
  isExistedMealSupport: null,
  mealTime: null,
  isExistedProductSupport: null,
  isExistedDormitorySupport: null,
  salesCommission: null,
  designerExperienceYearNumber: null,
  salesLast3MonthsAvg: null,
  subwayAccessibility: null,
  adminAge: null,
  adminSex: null,
  leaveDayCount: null,
  parkingSpotCount: null,
  isExistedCleaningSupplier: null,
  isExistedTowelSupplier: null,
  basicCutPrice: null,
  startWorkTime: null,
  endWorkTime: null,
  storeUrl: null,
  mainHairDie: null,
  description: null,
  educationCost: null,
  internSalary: null,
  designerPromitionPeriod: null,
  internExperienceYearNumber: null,
  isOnsiteManager: null,
  isExistedFourInsurances: null,
  isExistedRetirementPay: null,
  hasDesignerOptionNull: false,
  hasInternOptionNull: false,
  _postingRegions: [],
  postingRegions: null,
  postingRegionSiNames: null,
  jobPostingsStoreImages: []
};

export const useJobPostingEditStore = create(
  persist<JobPostingEditState & JobPostingEditActions>(
    (set, get) => ({
      ...defaultJobPostingEditState,
      setPostingTitle: (postingTitle: string) => set({ postingTitle }),
      setRole: (role: RoleKey) => {
        set({ role });
        if (role === "디자이너") {
          set({ hasInternOptionNull: false });
        } else if (role === "인턴") {
          set({ hasDesignerOptionNull: false });
        }
      },
      setMonthlyEducationDesignerCount: (
        monthlyEducationDesignerCount: MonthlyEducationDesignerCountKey
      ) => set({ monthlyEducationDesignerCount }),
      setMonthlyEducationInternCount: (
        monthlyEducationInternCount: MonthlyEducationInternCountKey
      ) => set({ monthlyEducationInternCount }),
      setAvailableOffDays: (day: AvailableOffDaysKey) => {
        const { availableOffDays } = get();
        set({ availableOffDays: toggleSelect(availableOffDays, day) });
      },
      setSettlementAllowance: (settlementAllowance: SettlementAllowanceKey) =>
        set({ settlementAllowance }),
      setIncentive: (incentive: IncentiveKey) => set({ incentive }),
      setSex: (sex: SexKey) => set({ sex }),
      setIsRestrictedAge: (isRestrictedAge: IsRestrictedAgeKey | null) => {
        set({ isRestrictedAge });
        if (!isRestrictedAge) {
          set({ isPossibleMiddleAge: null });
        }
      },
      setIsPossibleMiddleAge: (isPossibleMiddleAge: IsPossibleMiddleAgeKey) =>
        set({ isPossibleMiddleAge }),
      setDesignerLicenses: (license: DesignerLicensesKey) => {
        const { designerLicenses } = get();
        set({ designerLicenses: toggleSelect(designerLicenses, license) });
      },
      setStoreTypes: (selectedStore: StoreTypesKey) => {
        const { storeTypes } = get();
        if (storeTypes.length >= 2 && !storeTypes.includes(selectedStore)) {
          // 최대 2개까지 선택 가능
          return;
        }
        set({ storeTypes: toggleSelect(storeTypes, selectedStore) });
      },
      setEmployeeCount: (employeeCount: EmployeeCountKey) =>
        set({ employeeCount }),
      setIsExistedInternSystem: (
        isExistedInternSystem: isExistedInternSystemKey
      ) => set({ isExistedInternSystem }),
      setStoreInteriorRenovationAgo: (
        storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null
      ) => set({ storeInteriorRenovationAgo }),
      setWorkType: (workType: WorkTypeKey) => set({ workType }),
      setWorkCycle: (selectedWorkCycle: WorkCycleTypeKey) => {
        const { workCycleType } = get();
        set({ workCycleType: toggleSelect(workCycleType, selectedWorkCycle) });
      },
      setIsExistedEducationSupport: (
        isExistedEducationSupport: IsExistedEducationSupportKey | null
      ) => set({ isExistedEducationSupport }),
      setIsExistedMealSupport: (
        isExistedMealSupport: IsExistedMealSupportKey | null
      ) => set({ isExistedMealSupport }),
      setMealTime: (mealTime: MealTimeKey) => set({ mealTime }),
      setIsExistedProductSupport: (
        isExistedProductSupport: IsExistedProductSupportKey | null
      ) => set({ isExistedProductSupport }),
      setIsExistedDormitorySupport: (
        isExistedDormitorySupport: IsExistedDormitorySupportKey | null
      ) => set({ isExistedDormitorySupport }),
      setSalesCommission: (salesCommission: SalesCommissionKey) =>
        set({ salesCommission }),
      setDesignerExperienceYearNumber: (
        designerExperienceYearNumber: DesignerExperienceYearNumberKey
      ) => set({ designerExperienceYearNumber }),
      setSalesLast3MonthsAvg: (salesLast3MonthsAvg: SalesLast3MonthsAvgKey) =>
        set({ salesLast3MonthsAvg }),
      setSubwayAccessibility: (subwayAccessibility: SubwayAccessibilityKey) =>
        set({ subwayAccessibility }),
      setAdminAge: (adminAge: AdminAgeKey) => set({ adminAge }),
      setAdminSex: (adminSex: AdminSexKey) => set({ adminSex }),
      setLeaveDayCount: (leaveDayCount: LeaveDayCountKey) =>
        set({ leaveDayCount }),
      setParkingSpotCount: (parkingSpotCount: ParkingSpotCountKey) =>
        set({ parkingSpotCount }),
      setIsExistedCleaningSupplier: (
        isExistedCleaningSupplier: IsExistedCleaningSupplierKey | null
      ) => set({ isExistedCleaningSupplier }),
      setIsExistedTowelSupplier: (
        isExistedTowelSupplier: IsExistedTowelSupplierKey | null
      ) => set({ isExistedTowelSupplier }),
      setBasicCutPrice: (basicCutPrice: BasicCutPriceKey | null) =>
        set({ basicCutPrice }),
      setStartWorkTime: (startWorkTime: StartWorkTimeKey | null) =>
        set({ startWorkTime }),
      setEndWorkTime: (endWorkTime: EndWorkTimeKey | null) =>
        set({ endWorkTime }),
      setStoreUrl: (storeUrl: StoreUrlKey | null) =>
        set({
          storeUrl
        }),
      setMainHairDie: (mainHairDie: MainHairDyeKey | null) =>
        set({ mainHairDie }),
      setDescription: (description: DescriptionKey | null) =>
        set({ description }),
      setEducationCost: (educationCost: EducationCostKey | null) =>
        set({ educationCost }),
      setInternSalary: (internSalary: InternSalaryKey | null) =>
        set({ internSalary }),
      setDesignerPromitionPeriod: (
        designerPromitionPeriod: DesignerPromitionPeriodKey | null
      ) => set({ designerPromitionPeriod }),
      setInternExperienceYearNumber: (
        internExperienceYearNumber: InternExperienceYearNumberKey | null
      ) => set({ internExperienceYearNumber }),
      setIsOnsiteManager: (isOnsiteManager: IsOnsiteManagerKey | null) =>
        set({ isOnsiteManager }),
      setIsExistedFourInsurances: (
        isExistedFourInsurances: IsExistedFourInsurancesKey | null
      ) => set({ isExistedFourInsurances }),
      setIsExistedRetirementPay: (
        isExistedRetirementPay: IsExistedRetirementPayKey | null
      ) => set({ isExistedRetirementPay }),
      submitDesignerJobPosting: async () => {
        try {
          let jobPostingData: Record<string, any> = {
            postingTitle: get().postingTitle, // 게시글 제목
            storeName: get().storeName, // 매장명
            storeAddress: get().storeAddress, // 매장 주소
            storeRegion: get().storeRegion,
            storeRegionSiName: get().storeRegionSiName,
            // 기본 정보
            role: get().role,
            postingRegions: get().postingRegions, // 노출 지역
            postingRegionSiNames: get().postingRegionSiNames, // 노출 지역의 시
            monthlyEducationCount: get().monthlyEducationDesignerCount, // 교육
            // 휴무 가능일
            availableOffDays:
              get().availableOffDays.length > 0
                ? get().availableOffDays.join()
                : null,
            settlementAllowance: get().settlementAllowance, // 정착 지원금
            incentive: get().incentive, // 월 매출 100만원 시 인센티브

            // 상세 정보
            sex: get().sex, // 성별
            isRestrictedAge: get().isRestrictedAge, // 연령 제한
            isPossibleMiddleAge: get().isPossibleMiddleAge || false, // 중년 가능
            designerLicenses: get().designerLicenses.join(), // 미용 라이센스
            storeTypes: get().storeTypes.join(), // 매장 형태
            employeeCount: get().employeeCount, // 직원 수
            isExistedInternSystem: get().isExistedInternSystem, // 인턴 시스템
            storeInteriorRenovationAgo: get().storeInteriorRenovationAgo, // 매장 리모델링
            workType: get().workType, // 근무 형태
            workCycleType: get().workCycleType.join(), // 근무 주기
            isExistedEducationSupport: get().isExistedEducationSupport, // 교육 지원
            isExistedMealSupport: get().isExistedMealSupport, // 식대 지원
            mealTime: get().mealTime, // 식사 시간
            isExistedProductSupport: get().isExistedProductSupport, // 제품 지원
            isExistedDormitorySupport: get().isExistedDormitorySupport, // 기숙사 지원
            salesCommission: get().salesCommission, // 매출 수수료
            designerExperienceYearNumber: get().designerExperienceYearNumber, // 경력
            salesLast3MonthsAvg: get().salesLast3MonthsAvg, // 최근 3개월 매출
            subwayAccessibility: get().subwayAccessibility, // 지하철 접근성
            adminAge: get().adminAge, // 관리자 연령
            adminSex: get().adminSex, // 관리자 성별
            leaveDayCount: get().leaveDayCount, // 휴가일수
            parkingSpotCount: get().parkingSpotCount, // 주차장
            isExistedCleaningSupplier: get().isExistedCleaningSupplier, // 청소 업체
            isExistedTowelSupplier: get().isExistedTowelSupplier, // 수건 업체
            basicCutPrice: get().basicCutPrice, // 기본 컷 가격
            jobPostingStoreImages: get().jobPostingsStoreImages
          };

          if (jobPostingData.role !== "디자이너") {
            return false;
          }

          console.log("jobPostingData", jobPostingData);

          const hasNullField = Object.values(jobPostingData).some(
            (value) =>
              value === null ||
              value === "" ||
              (Array.isArray(value) && value.length === 0)
          );

          if (hasNullField) {
            set({ hasDesignerOptionNull: true });
            alert(
              "필수 항목 중 일부가 누락되었습니다. 모든 항목을 입력해주세요."
            );
            return false;
          } else {
            set({ hasDesignerOptionNull: false });
          }

          jobPostingData = convertToNullJobPostingData(jobPostingData);

          console.log("jobPostingData2", jobPostingData);

          const response = await postJobPostings(jobPostingData);
          if (response.data) {
            // set({ ...defaultJobPostingEditState });
            alert("채용 공고 등록이 완료되었습니다.");
            return true;
          } else {
            alert("채용 공고 등록에 실패했습니다. 다시 시도해주세요.");
            return false;
          }
        } catch (e) {
          console.error("디자이너 구인 공고 등록 중 오류 발생:", e);
          alert("디자이너 구인 공고 등록 중 오류가 발생했습니다.");
          return false;
        }
      },
      submitInternJobPosting: async () => {
        const {
          postingTitle,
          storeName,
          storeRegion,
          storeRegionSiName,
          storeAddress,
          // 기본 정보
          role,
          postingRegions,
          postingRegionSiNames,
          monthlyEducationInternCount,
          availableOffDays,
          internSalary
        } = get();

        try {
          const jobPostingData = {
            postingTitle, //게시글 제목
            storeName, // 매장명
            storeAddress, // 매장 주소
            storeRegion,
            storeRegionSiName,
            // 기본 정보
            role,
            postingRegions,
            postingRegionSiNames,
            monthlyEducationInternCount,
            availableOffDays:
              availableOffDays.length > 0 ? availableOffDays : null,
            internSalary
          };
          console.log("postingRegions", postingRegions);

          if (role !== "인턴") {
            return false;
          }

          const hasNullField = Object.values(jobPostingData).some(
            (value) => value === null
          );

          if (hasNullField) {
            set({ hasInternOptionNull: true });
            alert(
              "필수 항목 중 일부가 누락되었습니다. 모든 항목을 입력해주세요."
            );
            return false;
          }

          return true;
        } catch (e) {
          console.error("인턴 구인 공고 등록 중 오류 발생:", e);
          alert("인턴 구인 공고 등록 중 오류가 발생했습니다.");
          return false;
        }
      },
      setPostingRegions: (
        selectedRightItems: { key: string; value: string }[]
      ) => {
        const postingRegionSiNames = Array.from(
          new Set(selectedRightItems.map((item) => item.key.split(" ")[0]))
        ).join(",");

        const postingRegions = selectedRightItems
          .filter((item) => !item.value.includes("전체")) // "전체"가 포함되지 않은 항목만 필터링
          .map((item) => item.key)
          .join(",");

        set({
          _postingRegions: selectedRightItems,
          postingRegions,
          postingRegionSiNames
        });
      },
      setHasDesignerOptionNull: (hasDesignerOptionNull: boolean) =>
        set({ hasDesignerOptionNull }),
      setHasInternOptionNull: (hasInternOptionNull: boolean) =>
        set({ hasInternOptionNull }),
      setJobPostingsStoreImages: (newImages: JobPostingsStoreImageType[]) => {
        // 이미지가 5개를 초과할 경우 추가를 막음
        if (newImages.length >= 5) {
          alert("이미지는 최대 5개까지 추가할 수 있습니다.");
          return;
        }
        set({
          jobPostingsStoreImages: newImages
        });
      },
      setStoreRegion: (storeRegion: StoreInfoType) => {
        const title = storeRegion.title;
        const address = storeRegion.address;
        const regionMatch = address.match(/^(.*?[시도])\s(.*?[구군])/);

        if (regionMatch) {
          const storeRegionSiName = regionMatch[1];
          const storeRegion = `${regionMatch[1]} ${regionMatch[2]}`;

          set({
            storeName: title,
            storeRegion,
            storeRegionSiName,
            storeAddress: address
          });
        }
      }
    }),

    {
      name: "job-posting-edit-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// 중복 선택 가능 항목 처리를 위한 함수
const toggleSelect = <T extends string>(selectedItems: T[], item: T): T[] => {
  // "상관없음"이라는 항목이 선택된 경우 처리
  const indifferentOption = "상관없음" as T; // "상관없음" 값을 직접 비교하기 위해 저장

  if (item === indifferentOption) {
    // "상관없음"이 선택되면 다른 항목들은 모두 해제하고 "상관없음"만 선택
    return [indifferentOption];
  }

  // 이미 "상관없음"이 선택된 상태에서 다른 항목을 선택하려는 경우, "상관없음" 해제
  if (selectedItems.includes(indifferentOption)) {
    selectedItems = selectedItems.filter(
      (selectedItem) => selectedItem !== indifferentOption
    );
  }

  if (selectedItems.includes(item)) {
    // 이미 선택된 경우, 제거
    return selectedItems.filter((selectedItem) => selectedItem !== item);
  } else {
    // 선택되지 않은 경우, 추가
    return [...selectedItems, item];
  }
};

const convertToNullJobPostingData = (
  data: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === "상관없음" ? null : value
    ])
  );
};
