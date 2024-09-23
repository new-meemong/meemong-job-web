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
  StoreKey,
  SubwayAccessibilityKey,
  WorkCycleKey,
  WorkTypeKey
} from "@/types/job-posting-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type JobPostingsStoreImage = {
  uri: string;
  thumbnailUri: string;
};
type JobPostingEditState = {
  postingTitle: string | null;
  storeName: string | null;
  storeRegion: string | null;
  storeRegionSiName: string | null;

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
  store: StoreKey[];
  employeeCount: EmployeeCountKey | null;
  isExistedInternSystem: isExistedInternSystemKey | null;
  storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null;
  workType: WorkTypeKey | null;
  workCycle: WorkCycleKey[];
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
  jobPostingsStoreImages: JobPostingsStoreImage[];

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
  setStore: (store: StoreKey) => void;
  setEmployeeCount: (employeeCount: EmployeeCountKey) => void;
  setIsExistedInternSystem: (
    isExistedInternSystem: isExistedInternSystemKey
  ) => void;
  setStoreInteriorRenovationAgo: (
    storeInteriorRenovationAgo: StoreInteriorRenovationAgoKey | null
  ) => void;
  setWorkType: (workType: WorkTypeKey) => void;
  setWorkCycle: (workCycle: WorkCycleKey) => void;
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
  submitDesignerJobPosting: () => void;
  submitInternJobPosting: () => void;

  // 노출지역
  setPostingRegions: (
    selectedRightItems: { key: string; value: string }[]
  ) => void;

  setHasDesignerOptionNull: (hasDesignerOptionNull: boolean) => void;
  setHasInternOptionNull: (hasInternOptionNull: boolean) => void;
  setJobPostingsStoreImages: (images: JobPostingsStoreImage[]) => void;
};

const defaultJobPostingEditState: JobPostingEditState = {
  postingTitle: null,
  storeName: null,
  storeRegion: null,
  storeRegionSiName: null,
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
  store: [],
  employeeCount: null,
  isExistedInternSystem: null,
  storeInteriorRenovationAgo: null,
  workType: null,
  workCycle: [],
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
      setStore: (selectedStore: StoreKey) => {
        const { store } = get();
        if (store.length >= 2 && !store.includes(selectedStore)) {
          // 최대 2개까지 선택 가능
          return;
        }
        set({ store: toggleSelect(store, selectedStore) });
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
      setWorkCycle: (selectedWorkCycle: WorkCycleKey) => {
        const { workCycle } = get();
        set({ workCycle: toggleSelect(workCycle, selectedWorkCycle) });
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
        const {
          postingTitle,
          storeName,
          storeRegion,
          storeRegionSiName,
          // 기본 정보
          role,
          postingRegions,
          postingRegionSiNames,
          monthlyEducationDesignerCount,
          availableOffDays,
          settlementAllowance,
          incentive,
          // 상세 정보
          sex,
          isRestrictedAge
        } = get();

        try {
          const jobPostingData = {
            postingTitle,
            // storeName,
            // storeRegion,
            // storeRegionSiName,
            // 기본 정보
            role,
            postingRegions,
            postingRegionSiNames,
            monthlyEducationDesignerCount,
            availableOffDays:
              availableOffDays.length > 0 ? availableOffDays : null,
            settlementAllowance,
            incentive,
            // 상세 정보
            sex,
            isRestrictedAge
          };

          if (role !== "디자이너") {
            return;
          }

          const hasNullField = Object.values(jobPostingData).some(
            (value) => value === null
          );

          if (hasNullField) {
            set({ hasDesignerOptionNull: true });
            alert(
              "필수 항목 중 일부가 누락되었습니다. 모든 항목을 입력해주세요."
            );
            return;
          } else {
            set({ hasDesignerOptionNull: false });
          }

          const response = await postJobPostings(jobPostingData);
          if (response.status === 200 || response.status === 201) {
            // set({ ...defaultJobPostingEditState });
            alert("채용 공고 등록이 완료되었습니다.");
          } else {
            alert("채용 공고 등록에 실패했습니다. 다시 시도해주세요.");
          }
        } catch (e) {
          console.error("디자이너 구인 공고 등록 중 오류 발생:", e);
          alert("디자이너 구인 공고 등록 중 오류가 발생했습니다.");
        }
      },
      submitInternJobPosting: async () => {
        const {
          postingTitle,
          storeName,
          storeRegion,
          storeRegionSiName,
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
            postingTitle,
            // storeName,
            // storeRegion,
            // storeRegionSiName,
            // 기본 정보
            role,
            postingRegions,
            postingRegionSiNames,
            monthlyEducationInternCount,
            availableOffDays:
              availableOffDays.length > 0 ? availableOffDays : null,
            internSalary
          };

          if (role !== "인턴") {
            return;
          }

          const hasNullField = Object.values(jobPostingData).some(
            (value) => value === null
          );

          if (hasNullField) {
            set({ hasInternOptionNull: true });
            alert(
              "필수 항목 중 일부가 누락되었습니다. 모든 항목을 입력해주세요."
            );
            return;
          }
        } catch (e) {
          console.error("인턴 구인 공고 등록 중 오류 발생:", e);
          alert("인턴 구인 공고 등록 중 오류가 발생했습니다.");
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
      setJobPostingsStoreImages: (newImages: JobPostingsStoreImage[]) => {
        // 이미지가 5개를 초과할 경우 추가를 막음
        if (newImages.length >= 5) {
          alert("이미지는 최대 5개까지 추가할 수 있습니다.");
          return;
        }
        set({
          jobPostingsStoreImages: newImages
        });
      }
    }),

    {
      name: "job-posting-edit-store",
      getStorage: () => localStorage
    }
  )
);

// 중복 선택 가능 항목 처리를 위한 함수
const toggleSelect = <T>(selectedItems: T[], item: T): T[] => {
  if (selectedItems.includes(item)) {
    // 이미 선택된 경우, 제거
    return selectedItems.filter((selectedItem) => selectedItem !== item);
  } else {
    // 선택되지 않은 경우, 추가
    return [...selectedItems, item];
  }
};
