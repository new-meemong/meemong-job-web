import {
  DesignerExperienceYearNumberKeyResume,
  DesignerLicencesKeyResume,
  InternExpectedSalaryKeyResume,
  InternExperienceYearNumberKeyResume,
  RoleKeyResume,
  SettlementAllowanceKeyResume,
  WorkTypeKeyResume
} from "@/types/resume-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ResumeEditState = {
  profileImageUri: string | null;
  profileImageThumbnailUri: string | null;
  shortDescription: string | null;
  userName: string | null;
  birthday: number | null;

  // 선호 지역
  _preferredStoreRegions: { key: string; value: string }[];
  preferredStoreRegions: string | null;
  preferredStoreRegionSiNames: string | null;

  appliedRole: RoleKeyResume;
  workType: WorkTypeKeyResume | null;
  settlementAllowance: SettlementAllowanceKeyResume | null;
  internExpectedSalary: InternExpectedSalaryKeyResume | null;
  designerLicences: DesignerLicencesKeyResume | null;
  designerExperienceYearNumber: DesignerExperienceYearNumberKeyResume | null;
  internExperienceYearNumber: InternExperienceYearNumberKeyResume | null;
};

type ResumeEditActions = {
  setProfileImageUri: (uri: string | null) => void;
  setProfileImageThumbnailUri: (uri: string | null) => void;
  setShortDescription: (description: string | null) => void;
  setUserName: (name: string | null) => void;
  setPreferredStoreRegions: (regions: { key: string; value: string }[]) => void;
  setBirthday: (birthday: number | null) => void;
  setAppliedRole: (role: RoleKeyResume) => void;
  setWorkType: (workType: WorkTypeKeyResume | null) => void;
  setSettlementAllowance: (
    allowance: SettlementAllowanceKeyResume | null
  ) => void;
  setInternExpectedSalary: (
    salary: InternExpectedSalaryKeyResume | null
  ) => void;
  setDesignerLicences: (licences: DesignerLicencesKeyResume | null) => void;
  setDesignerExperienceYearNumber: (
    yearNumber: DesignerExperienceYearNumberKeyResume | null
  ) => void;
  setInternExperienceYearNumber: (
    yearNumber: InternExperienceYearNumberKeyResume | null
  ) => void;
};

const defaultResumeEditState: ResumeEditState = {
  profileImageUri: null,
  profileImageThumbnailUri: null,
  shortDescription: null,
  userName: null,
  _preferredStoreRegions: [],
  preferredStoreRegions: null,
  preferredStoreRegionSiNames: null,
  birthday: null,
  appliedRole: "디자이너",
  workType: null,
  settlementAllowance: null,
  internExpectedSalary: null,
  designerLicences: null,
  designerExperienceYearNumber: null,
  internExperienceYearNumber: null
};

export const useResumeEditStore = create(
  persist<ResumeEditState & ResumeEditActions>(
    (set, get) => ({
      ...defaultResumeEditState,
      setProfileImageUri: (uri) => set({ profileImageUri: uri }),
      setProfileImageThumbnailUri: (uri) =>
        set({ profileImageThumbnailUri: uri }),
      setShortDescription: (description) =>
        set({ shortDescription: description }),
      setUserName: (name) => set({ userName: name }),
      setPreferredStoreRegions: (regions) =>
        set({
          _preferredStoreRegions: regions,
          preferredStoreRegions: Array.from(
            new Set(regions.map((item) => item.key.split(" ")[0]))
          ).join(","),
          preferredStoreRegionSiNames: regions
            .filter((item) => !item.value.includes("전체"))
            .map((item) => item.key)
            .join(",")
        }),
      setBirthday: (birthday) => set({ birthday }),
      setAppliedRole: (role: RoleKeyResume) => set({ appliedRole: role }),
      setWorkType: (workType: WorkTypeKeyResume | null) => set({ workType }),
      setSettlementAllowance: (
        allowance: SettlementAllowanceKeyResume | null
      ) => set({ settlementAllowance: allowance }),
      setInternExpectedSalary: (salary: InternExpectedSalaryKeyResume | null) =>
        set({ internExpectedSalary: salary }),
      setDesignerLicences: (licences: DesignerLicencesKeyResume | null) =>
        set({ designerLicences: licences }),
      setDesignerExperienceYearNumber: (
        yearNumber: DesignerExperienceYearNumberKeyResume | null
      ) => set({ designerExperienceYearNumber: yearNumber }),
      setInternExperienceYearNumber: (
        yearNumber: InternExperienceYearNumberKeyResume | null
      ) => set({ internExperienceYearNumber: yearNumber })
    }),
    {
      name: "resume-edit-store",
      getStorage: () => localStorage
    }
  )
);
