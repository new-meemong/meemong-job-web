import { postResume, putResume } from "@/apis/resumes";
import { siSggList } from "@/types/location-type";
import { ResponseResultType } from "@/types/response-result-type";
import {
  CompletedEducationLevelsKeyResume,
  DesignerExperienceYearNumberKeyResume,
  DesignerLicensesKeyResume,
  DesignerPromotionPeriodKeyResume,
  InternExpectedSalaryKeyResume,
  InternExperienceYearNumberKeyResume,
  IsPreferredDormitorySupportKeyResume,
  IsPreferredMealSupportKeyResume,
  IsPreferredParkingKeyResume,
  PreferredMonthlyEducationDesignerCountKeyResume,
  PreferredMonthlyEducationInternCountKeyResume,
  PreferredOffDaysKeyResume,
  RoleKeyResume,
  SalesLast3MonthsAvgKeyResume,
  SettlementAllowanceKeyResume,
  WorkCycleTypesKeyResume,
  WorkTypeKeyResume
} from "@/types/resume-keys";
import { ResumeType } from "@/types/resume-type";
import moment from "moment";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ResumeEditState = {
  id: string | null;
  profileImageUri: string | null;
  profileImageThumbnailUri: string | null;
  shortDescription: string | null;
  userName: string | null;
  sex: string | null;
  birthday: string | null;

  // 선호 지역
  _preferredStoreRegions: { key: string; value: string }[];
  preferredStoreRegions: string | null;
  preferredStoreRegionSiNames: string | null;

  appliedRole: RoleKeyResume | null;
  workType: WorkTypeKeyResume | null;
  settlementAllowance: SettlementAllowanceKeyResume | null;
  internExpectedSalary: InternExpectedSalaryKeyResume | null;
  designerLicenses: DesignerLicensesKeyResume[];
  designerExperienceYearNumber: DesignerExperienceYearNumberKeyResume | null;
  internExperienceYearNumber: InternExperienceYearNumberKeyResume | null;

  // 추가 사항들
  designerMajorExperienceCompanyName: string | null;
  designerMajorExperienceDuration: string | null;
  designerMajorExperienceRole: string | null;
  internMajorExperienceCompanyName: string | null;
  internMajorExperienceDuration: string | null;
  internMajorExperienceRole: string | null;
  salesLast3MonthsAvg: SalesLast3MonthsAvgKeyResume | null;
  completedEducationLevels: CompletedEducationLevelsKeyResume[];
  preferredOffDays: PreferredOffDaysKeyResume[];
  workCycleTypes: WorkCycleTypesKeyResume[];
  designerPromotionPeriod: DesignerPromotionPeriodKeyResume | null;
  isPreferredDormitorySupport: IsPreferredDormitorySupportKeyResume | null;
  preferredMonthlyEducationDesignerCount: PreferredMonthlyEducationDesignerCountKeyResume | null;
  preferredMonthlyEducationInternCount: PreferredMonthlyEducationInternCountKeyResume | null;
  isPreferredMealSupport: IsPreferredMealSupportKeyResume | null;
  isPreferredParking: IsPreferredParkingKeyResume | null;
  mbti: string | null;
  description: string | null;

  hasDesignerOptionNull: boolean;
  hasInternOptionNull: boolean;

  isExposure: boolean;
};

type ResumeEditActions = {
  setId: (id: string | null) => void;
  setProfileImageUri: (uri: string | null) => void;
  setProfileImageThumbnailUri: (uri: string | null) => void;
  setShortDescription: (description: string | null) => void;
  setUserName: (name: string | null) => void;
  setSex: (sex: string) => void;
  setPreferredStoreRegions: (regions: { key: string; value: string }[]) => void;
  setBirthday: (birthday: string | null) => void;
  setAppliedRole: (role: RoleKeyResume | null) => void;
  setWorkType: (workType: WorkTypeKeyResume | null) => void;
  setSettlementAllowance: (
    allowance: SettlementAllowanceKeyResume | null
  ) => void;
  setInternExpectedSalary: (
    salary: InternExpectedSalaryKeyResume | null
  ) => void;
  setDesignerLicenses: (licences: DesignerLicensesKeyResume) => void;
  setDesignerExperienceYearNumber: (
    yearNumber: DesignerExperienceYearNumberKeyResume | null
  ) => void;
  setInternExperienceYearNumber: (
    yearNumber: InternExperienceYearNumberKeyResume | null
  ) => void;
  setDesignerMajorExperienceCompanyName: (companyName: string | null) => void;
  setDesignerMajorExperienceDuration: (duration: string | null) => void;
  setDesignerMajorExperienceRole: (role: string | null) => void;
  setInternMajorExperienceCompanyName: (companyName: string | null) => void;
  setInternMajorExperienceDuration: (duration: string | null) => void;
  setInternMajorExperienceRole: (role: string | null) => void;
  setSalesLast3MonthsAvg: (avg: SalesLast3MonthsAvgKeyResume | null) => void;
  setCompletedEducationLevels: (
    level: CompletedEducationLevelsKeyResume
  ) => void;
  setPreferredOffDays: (days: PreferredOffDaysKeyResume) => void;
  setWorkCycleTypes: (cycle: WorkCycleTypesKeyResume) => void;
  setDesignerPromotionPeriod: (
    period: DesignerPromotionPeriodKeyResume | null
  ) => void;
  setIsPreferredDormitorySupport: (
    isPreferred: IsPreferredDormitorySupportKeyResume | null
  ) => void;
  setPreferredMonthlyEducationDesignerCount: (
    count: PreferredMonthlyEducationDesignerCountKeyResume | null
  ) => void;
  setPreferredMonthlyEducationInternCount: (
    count: PreferredMonthlyEducationInternCountKeyResume | null
  ) => void;
  setIsPreferredMealSupport: (
    isPreferred: IsPreferredMealSupportKeyResume | null
  ) => void;
  setIsPreferredParking: (
    isPreferred: IsPreferredParkingKeyResume | null
  ) => void;
  setMbti: (mbti: string | null) => void;
  setDescription: (description: string | null) => void;
  setIsExposure: (isExposure: boolean) => void;

  // 임시저장 및 이력서 등록
  saveDraft: () => Promise<ResponseResultType>;
  submitResume: () => Promise<ResponseResultType>;
  resetStore: () => void;
  setFromResume: (resume: ResumeType) => void;
};

const defaultResumeEditState: ResumeEditState = {
  id: null,
  profileImageUri: null,
  profileImageThumbnailUri: null,
  shortDescription: null,
  userName: null,
  sex: null,
  _preferredStoreRegions: [],
  preferredStoreRegions: null,
  preferredStoreRegionSiNames: null,
  birthday: null,
  appliedRole: null,
  workType: null,
  settlementAllowance: null,
  internExpectedSalary: null,
  designerLicenses: [],
  designerExperienceYearNumber: null,
  internExperienceYearNumber: null,
  designerMajorExperienceCompanyName: null,
  designerMajorExperienceDuration: null,
  designerMajorExperienceRole: null,
  internMajorExperienceCompanyName: null,
  internMajorExperienceDuration: null,
  internMajorExperienceRole: null,
  salesLast3MonthsAvg: null,
  completedEducationLevels: [],
  preferredOffDays: [],
  workCycleTypes: [],
  designerPromotionPeriod: null,
  isPreferredDormitorySupport: null,
  preferredMonthlyEducationDesignerCount: null,
  preferredMonthlyEducationInternCount: null,
  isPreferredMealSupport: null,
  isPreferredParking: null,
  mbti: null,
  description: null,
  hasDesignerOptionNull: false,
  hasInternOptionNull: false,
  isExposure: false
};

export const useResumeEditStore = create(
  persist<ResumeEditState & ResumeEditActions>(
    (set, get) => ({
      ...defaultResumeEditState,
      resetStore: () => set({ ...defaultResumeEditState }),
      setFromResume: (resume: ResumeType) => {
        const parsedRegions = parsePostingRegions(resume);

        if (resume.appliedRole === "디자이너") {
          set({
            preferredMonthlyEducationDesignerCount:
              resume.preferredMonthlyEducationCount as PreferredMonthlyEducationDesignerCountKeyResume,
            preferredMonthlyEducationInternCount: null
          });
        } else if (resume.appliedRole === "인턴") {
          set({
            preferredMonthlyEducationDesignerCount: null,
            preferredMonthlyEducationInternCount:
              resume.preferredMonthlyEducationCount as PreferredMonthlyEducationInternCountKeyResume
          });
        }

        set({
          // id: resume.id,
          profileImageUri: resume.profileImageUri,
          profileImageThumbnailUri: resume.profileImageThumbnailUri,
          shortDescription: resume.shortDescription,
          userName: resume.userName,
          _preferredStoreRegions:
            get()._preferredStoreRegions.length !== 0
              ? get()._preferredStoreRegions
              : parsedRegions,
          preferredStoreRegions: get().preferredStoreRegions
            ? get().preferredStoreRegions
            : resume.preferredStoreRegions,
          preferredStoreRegionSiNames: get().preferredStoreRegionSiNames
            ? get().preferredStoreRegionSiNames
            : resume.preferredStoreRegionSiNames,
          birthday: moment(resume.birthday).format("YYMMDD"),
          appliedRole: resume.appliedRole,
          workType: resume.workType || "상관없음",
          settlementAllowance: resume.settlementAllowance || "상관없음",
          internExpectedSalary: resume.internExpectedSalary || "상관없음",
          designerLicenses: resume.designerLicenses
            ? (resume.designerLicenses.split(
                ","
              ) as DesignerLicensesKeyResume[])
            : ["없음"],
          designerExperienceYearNumber: resume.designerExperienceYearNumber,
          internExperienceYearNumber: resume.internExperienceYearNumber,
          designerMajorExperienceCompanyName:
            resume.designerMajorExperienceCompanyName,
          designerMajorExperienceDuration:
            resume.designerMajorExperienceDuration,
          designerMajorExperienceRole: resume.designerMajorExperienceRole,
          internMajorExperienceCompanyName:
            resume.internMajorExperienceCompanyName,
          internMajorExperienceDuration: resume.internMajorExperienceDuration,
          internMajorExperienceRole: resume.internMajorExperienceRole,
          salesLast3MonthsAvg: resume.salesLast3MonthsAvg,
          completedEducationLevels: resume.completedEducationLevels
            ? (resume.completedEducationLevels.split(
                ","
              ) as CompletedEducationLevelsKeyResume[])
            : [],
          preferredOffDays: resume.preferredOffDays
            ? (resume.preferredOffDays.split(
                ","
              ) as PreferredOffDaysKeyResume[])
            : ["상관없음"],
          workCycleTypes: resume.workCycleTypes
            ? (resume.workCycleTypes.split(",") as WorkCycleTypesKeyResume[])
            : [],
          designerPromotionPeriod: resume.designerPromotionPeriod,
          isPreferredDormitorySupport: resume.isPreferredDormitorySupport,
          isPreferredMealSupport: resume.isPreferredMealSupport,
          isPreferredParking: resume.isPreferredParking,
          mbti: resume.mbti,
          description: resume.description,
          isExposure: resume.isExposure
        });
      },
      setId: (id: string | null) => set({ id }),
      setProfileImageUri: (uri) => set({ profileImageUri: uri }),
      setProfileImageThumbnailUri: (uri) =>
        set({ profileImageThumbnailUri: uri }),
      setShortDescription: (description) => {
        if (description !== null && description.length > 22) {
          return;
        }

        set({ shortDescription: description });
      },
      setUserName: (name) => set({ userName: name }),
      setSex: (sex) => set({ sex }),
      setPreferredStoreRegions: (regions) => {
        const preferredStoreRegionSiNames = Array.from(
          new Set(regions.map((item) => item.key.split(" ")[0]))
        ).join(",");
        const preferredStoreRegions = regions
          .filter((item) => !item.value.includes("전체"))
          .map((item) => item.key)
          .join(",");

        set({
          _preferredStoreRegions: regions,
          preferredStoreRegionSiNames,
          preferredStoreRegions: preferredStoreRegions
        });
      },
      setBirthday: (birthday) => set({ birthday }),
      setAppliedRole: (role: RoleKeyResume | null) =>
        set({ appliedRole: role }),
      setWorkType: (workType: WorkTypeKeyResume | null) => set({ workType }),
      setSettlementAllowance: (
        allowance: SettlementAllowanceKeyResume | null
      ) => set({ settlementAllowance: allowance }),
      setInternExpectedSalary: (salary: InternExpectedSalaryKeyResume | null) =>
        set({ internExpectedSalary: salary }),
      setDesignerLicenses: (license: DesignerLicensesKeyResume) => {
        const { designerLicenses } = get();

        set({ designerLicenses: toggleSelect(designerLicenses, license) });
      },
      setDesignerExperienceYearNumber: (
        yearNumber: DesignerExperienceYearNumberKeyResume | null
      ) => set({ designerExperienceYearNumber: yearNumber }),
      setInternExperienceYearNumber: (
        yearNumber: InternExperienceYearNumberKeyResume | null
      ) => set({ internExperienceYearNumber: yearNumber }),
      setDesignerMajorExperienceCompanyName: (companyName) =>
        set({ designerMajorExperienceCompanyName: companyName }),
      setDesignerMajorExperienceDuration: (duration) =>
        set({ designerMajorExperienceDuration: duration }),
      setDesignerMajorExperienceRole: (role) =>
        set({ designerMajorExperienceRole: role }),
      setInternMajorExperienceCompanyName: (companyName) =>
        set({ internMajorExperienceCompanyName: companyName }),
      setInternMajorExperienceDuration: (duration) =>
        set({ internMajorExperienceDuration: duration }),
      setInternMajorExperienceRole: (role) =>
        set({ internMajorExperienceRole: role }),
      setSalesLast3MonthsAvg: (avg) => set({ salesLast3MonthsAvg: avg }),
      setCompletedEducationLevels: (
        level: CompletedEducationLevelsKeyResume
      ) => {
        const { completedEducationLevels } = get();
        set({
          completedEducationLevels: toggleSelect(
            completedEducationLevels,
            level
          )
        });
      },
      setPreferredOffDays: (day: PreferredOffDaysKeyResume) => {
        const { preferredOffDays } = get();
        set({ preferredOffDays: toggleSelect(preferredOffDays, day) });
      },
      setWorkCycleTypes: (cycle: WorkCycleTypesKeyResume) => {
        const { workCycleTypes } = get();
        set({ workCycleTypes: toggleSelect(workCycleTypes, cycle) });
      },
      setDesignerPromotionPeriod: (period) =>
        set({ designerPromotionPeriod: period }),
      setIsPreferredDormitorySupport: (isPreferred) =>
        set({ isPreferredDormitorySupport: isPreferred }),
      setPreferredMonthlyEducationDesignerCount: (count) =>
        set({ preferredMonthlyEducationDesignerCount: count }),
      setPreferredMonthlyEducationInternCount: (count) =>
        set({ preferredMonthlyEducationInternCount: count }),
      setIsPreferredMealSupport: (isPreferred) =>
        set({ isPreferredMealSupport: isPreferred }),
      setIsPreferredParking: (isPreferred) =>
        set({ isPreferredParking: isPreferred }),
      setMbti: (mbti) => set({ mbti }),
      setDescription: (description) => set({ description }),
      setIsExposure: (isExposure) => set({ isExposure }),

      // 임시저장 및 이력서 등록
      saveDraft: async () => {
        try {
          const state = get();
          const { appliedRole, id } = state;

          const resumeRequiredStates = getResumeRequiredData(state);
          const missingFields = hasMissingRequiredFields(resumeRequiredStates);

          if (!appliedRole) {
            return {
              status: false,
              message: "지원 분야를 선택해주세요."
            };
          }
          if (missingFields) {
            setOptionNullFlag(appliedRole, true, set);
            return {
              status: false,
              message: `모든 항목을 입력해야\n이력서를 등록할 수 있습니다.`
            };
          } else {
            setOptionNullFlag(appliedRole, false, set);
          }

          const resumeData = prepareResumeData(state);

          resumeData.isExposure = false;

          const response = id
            ? await putResume(id, resumeData)
            : await postResume(resumeData);

          if (response.data) {
            return {
              status: true,
              message: "이력서가 성공적으로 저장되었습니다.",
              data: response.data
            };
          } else {
            return {
              status: false,
              message: "이력서 저장중 오류가 발생했습니다."
            };
          }
        } catch (e) {
          console.error("이력서 저장중 오류 발생: ", e);

          return {
            status: false,
            message: "이력서 저장중 오류가 발생했습니다."
          };
        }
      },
      submitResume: async () => {
        try {
          const state = get();
          const { appliedRole, id } = state;

          const resumeRequiredStates = getResumeRequiredData(state);
          const missingFields = hasMissingRequiredFields(resumeRequiredStates);
          if (!appliedRole) {
            return {
              status: false,
              message: "지원 분야를 선택해주세요."
            };
          }
          if (missingFields) {
            setOptionNullFlag(appliedRole, true, set);
            return {
              status: false,
              message: `필수 항목을 입력해야\n이력서를 등록할 수 있습니다.`
            };
          } else {
            setOptionNullFlag(appliedRole, false, set);
          }

          const resumeData = prepareResumeData(state);
          resumeData.isExposure = true;
          const response = id
            ? await putResume(id, resumeData)
            : await postResume(resumeData);

          if (response.data) {
            return {
              status: true,
              message: "이력서가 성공적으로 등록되었습니다.",
              data: response.data
            };
          } else {
            return {
              status: false,
              message: "이력서 등록중 오류가 발생했습니다."
            };
          }
        } catch (e) {
          console.error("이력서 등록중 오류 발생: ", e);
          toast("이력서 등록중 오류가 발생했습니다. 다시 시도해주세요.");
          return {
            status: false,
            message: "이력서 등록중 오류가 발생했습니다."
          };
        }
      }
    }),
    {
      name: "resume-edit-store",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

const parsePostingRegions = (resume: ResumeType) => {
  let parsedRegions = [];
  parsedRegions = resume.preferredStoreRegions
    ? resume.preferredStoreRegions.split(",").map((region) => {
        const [, district] = region.split(" ");
        return { key: region, value: district };
      })
    : [];

  // 시만 있고 구는 없는 경우
  if (!resume.preferredStoreRegions) {
    parsedRegions = resume.preferredStoreRegionSiNames
      .split(",")
      .map((region) => {
        return siSggList[region][0];
      });
  }

  // 구가 없는 시만 추출하기
  const onlySi = resume.preferredStoreRegionSiNames
    .split(",") // 콤마로 구분하여 배열로 변환
    .filter((si) => si !== resume.preferredStoreRegions.split(" ")[0]);

  if (onlySi.length > 0) {
    const parsedSi = onlySi.map((si) => {
      return siSggList[si][0];
    });
    parsedRegions = [...parsedRegions, ...parsedSi];
  }

  return parsedRegions;
};

const prepareResumeData = (state: ResumeEditState): ResumeType => {
  const resumeRequiredStates = getResumeRequiredData(state);
  const resumeOptionalStates = getResumeOptionalData(state);

  return convertToNullJobPostingData({
    ...resumeRequiredStates,
    ...resumeOptionalStates
  }) as ResumeType;
};

const setOptionNullFlag = (
  appliedRole: RoleKeyResume,
  flag: boolean,
  set: (partialState: Partial<ResumeEditState>) => void
) => {
  const flagKey =
    appliedRole === "디자이너"
      ? "hasDesignerOptionNull"
      : appliedRole === "인턴"
      ? "hasInternOptionNull"
      : null;
  if (flagKey) {
    set({ [flagKey]: flag });
  }
};

const hasMissingRequiredFields = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requiredStates: Record<string, any>
): boolean => {
  return Object.entries(requiredStates).some(([key, value]) => {
    if (
      key === "preferredStoreRegions" &&
      (value === "" || (Array.isArray(value) && value.length === 0))
    ) {
      return false;
    }

    // 다른 필드에 대한 기본 null/빈 값 검사
    return (
      key !== "postingRegions" &&
      (value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0))
    );
  });
};

const getResumeRequiredData = (state: ResumeEditState) => {
  const { appliedRole } = state;
  let requiredStates = {};
  if (appliedRole === "디자이너") {
    requiredStates = {
      profileImageUri: state.profileImageUri,
      profileImageThumbnailUri: state.profileImageThumbnailUri,
      shortDescription: state.shortDescription,
      userName: state.userName,

      preferredStoreRegions: state.preferredStoreRegions,
      preferredStoreRegionSiNames: state.preferredStoreRegionSiNames,
      birthday: moment(state.birthday, "YYMMDD").format("YYYY-MM-DD"),
      appliedRole: state.appliedRole,
      workType: state.workType,
      settlementAllowance: state.settlementAllowance,
      designerLicenses: state.designerLicenses.join(","),
      designerExperienceYearNumber: state.designerExperienceYearNumber
    };
  } else if (appliedRole === "인턴") {
    requiredStates = {
      profileImageUri: state.profileImageUri,
      profileImageThumbnailUri: state.profileImageThumbnailUri,
      shortDescription: state.shortDescription,
      userName: state.userName,

      preferredStoreRegions: state.preferredStoreRegions,
      preferredStoreRegionSiNames: state.preferredStoreRegionSiNames,
      birthday: moment(state.birthday, "YYMMDD").format("YYYY-MM-DD"),
      appliedRole: state.appliedRole,
      workType: state.workType,
      internExpectedSalary: state.internExpectedSalary,
      designerLicenses: state.designerLicenses.join(","),
      internExperienceYearNumber: state.internExperienceYearNumber
    };
  }

  return requiredStates;
};

const getResumeOptionalData = (state: ResumeEditState) => {
  const { appliedRole } = state;
  let optionalStates = {};

  if (appliedRole === "디자이너") {
    optionalStates = {
      designerMajorExperienceCompanyName:
        state.designerMajorExperienceCompanyName,
      designerMajorExperienceDuration: state.designerMajorExperienceDuration,
      designerMajorExperienceRole: state.designerMajorExperienceRole,
      salesLast3MonthsAvg: state.salesLast3MonthsAvg,
      completedEducationLevels: state.completedEducationLevels.join(","),
      preferredOffDays: state.preferredOffDays.join(","),
      workCycleTypes: state.workCycleTypes.join(","),
      isPreferredDormitorySupport: state.isPreferredDormitorySupport,
      preferredMonthlyEducationCount:
        state.preferredMonthlyEducationDesignerCount,
      isPreferredMealSupport: state.isPreferredMealSupport,
      isPreferredParking: state.isPreferredParking,
      mbti: state.mbti,
      description: state.description,
      sex: state.sex
    };
  } else if (appliedRole === "인턴") {
    optionalStates = {
      internMajorExperienceCompanyName: state.internMajorExperienceCompanyName,
      internMajorExperienceDuration: state.internMajorExperienceDuration,
      internMajorExperienceRole: state.internMajorExperienceRole,
      completedEducationLevels: state.completedEducationLevels.join(","),
      preferredOffDays: state.preferredOffDays.join(","),
      workCycleTypes: state.workCycleTypes.join(","),
      designerPromotionPeriod: state.designerPromotionPeriod,
      isPreferredDormitorySupport: state.isPreferredDormitorySupport,
      preferredMonthlyEducationCount:
        state.preferredMonthlyEducationInternCount,
      isPreferredMealSupport: state.isPreferredMealSupport,
      isPreferredParking: state.isPreferredParking,
      mbti: state.mbti,
      description: state.description,
      sex: state.sex
    };
  }

  return optionalStates;
};

// 중복 선택 가능 항목 처리를 위한 함수
const toggleSelect = <T extends string>(selectedItems: T[], item: T): T[] => {
  // "상관없음"이라는 항목이 선택된 경우 처리
  const indifferentOptions = ["상관없음", "없음", "해당없음"] as T[];

  if (indifferentOptions.includes(item)) {
    // "상관없음"이나 "없음"이 선택되면 다른 항목들은 모두 해제하고 해당 값만 선택
    return [item];
  }

  // 이미 "상관없음" 또는 "없음"이 선택된 상태에서 다른 항목을 선택하려는 경우, 해제
  selectedItems = selectedItems.filter(
    (selectedItem) => !indifferentOptions.includes(selectedItem)
  );

  if (selectedItems.includes(item)) {
    // 이미 선택된 경우, 제거
    return selectedItems.filter((selectedItem) => selectedItem !== item);
  } else {
    // 선택되지 않은 경우, 추가
    return [...selectedItems, item];
  }
};

const convertToNullJobPostingData = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> => {
  const nullifyValues = ["상관없음", "해당없음", "필요없음"];

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      nullifyValues.includes(value) ? null : value
    ])
  );
};
