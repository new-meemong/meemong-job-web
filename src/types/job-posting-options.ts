import {
  AvailableOffDaysKey,
  DesignerLicensesKey,
  EmployeeCountKey,
  IncentiveKey,
  isExistedInternSystemKey,
  IsPossibleMiddleAgeKey,
  IsRestrictedAgeKey,
  MonthlyEducationDesignerCountKey,
  MonthlyEducationInternCountKey,
  RoleKey,
  SettlementAllowanceKey,
  SexKey,
  StoreKey
} from "./job-posting-types";

interface Option<KeyType> {
  key: KeyType;
  value: string;
}

type RoleOption = Option<RoleKey>;
type MonthlyEducationDesignerCountOption =
  Option<MonthlyEducationDesignerCountKey>;
type MonthlyEducationInternCountOption = Option<MonthlyEducationInternCountKey>;
type AvailableOffDaysOption = Option<AvailableOffDaysKey>;
type SettlementAllowanceOption = Option<SettlementAllowanceKey>;
type IncentiveOption = Option<IncentiveKey>;
type SexOption = Option<SexKey>;
type IsRestrictedAgeOption = Option<IsRestrictedAgeKey>;
type IsPossibleMiddleAgeOption = Option<IsPossibleMiddleAgeKey>;
type DesignerLicensesOption = Option<DesignerLicensesKey>;
type StoreOption = Option<StoreKey>;
type EmployeeCountOption = Option<EmployeeCountKey>;
type IsExistedInternSystemOption = Option<isExistedInternSystemKey>;

export const jobPostingOptions: {
  role: RoleOption[];
  monthlyEducationDesignerCount: MonthlyEducationDesignerCountOption[];
  monthlyEducationInternCount: MonthlyEducationInternCountOption[];
  availableOffDays: AvailableOffDaysOption[];
  settlementAllowance: SettlementAllowanceOption[];
  incentive: IncentiveOption[];
  sex: SexOption[];
  isRestrictedAge: IsRestrictedAgeOption[];
  isPossibleMiddleAge: IsPossibleMiddleAgeOption[];
  designerLicenses: DesignerLicensesOption[];
  store: StoreOption[];
  employeeCount: EmployeeCountOption[];
  isExistedInternSystem: IsExistedInternSystemOption[];
} = {
  role: [
    { key: "디자이너", value: "디자이너" },
    { key: "인턴", value: "인턴" }
  ],
  // 교육 - 디자이너
  monthlyEducationDesignerCount: [
    { key: "월 1회 이상", value: "월 1회 이상" },
    { key: "월 2회 이상", value: "월 2회 이상" },
    { key: "월 3회 이상", value: "월 3회 이상" }
  ],
  // 교육 - 인턴
  monthlyEducationInternCount: [
    { key: "월 2회 이하", value: "월 2회 이하" },
    { key: "월 3회 이상", value: "월 3회 이상" },
    { key: "월 4회 이상", value: "월 4회 이상" }
  ],
  // 휴뮤 가능일
  availableOffDays: [
    { key: "월", value: "월" },
    { key: "화", value: "화" },
    { key: "수", value: "수" },
    { key: "목", value: "목" },
    { key: "금", value: "금" },
    { key: "토", value: "토" },
    { key: "일", value: "일" }
  ],
  // 정착지원금-디자이너
  settlementAllowance: [
    { key: "179만원 이하", value: "179만원 이하" },
    { key: "180만원 이상", value: "180만원 이상" },
    { key: "210만원 이상", value: "210만원 이상" },
    { key: "240만원 이상", value: "240만원 이상" },
    { key: "270만원 이상", value: "270만원 이상" },
    { key: "300만원 이상", value: "300만원 이상" },
    { key: "330만원 이상", value: "330만원 이상" },
    { key: "360만원 이상", value: "360만원 이상" }
  ],
  // 인센티브-디자이너
  incentive: [
    { key: "29% 이하", value: "29% 이하" },
    { key: "30% 이상", value: "30% 이상" },
    { key: "35% 이상", value: "35% 이상" },
    { key: "40% 이상", value: "40% 이상" },
    { key: "45% 이상", value: "45% 이상" },
    { key: "50% 이상", value: "50% 이상" },
    { key: "60% 이상", value: "60% 이상" },
    { key: "70% 이상", value: "70% 이상" }
  ],
  // 성별
  sex: [
    { key: "남", value: "남" },
    { key: "여", value: "여" },
    { key: "무관", value: "성별 무관" }
  ],
  // 연령 제한
  isRestrictedAge: [
    { key: false, value: "연령 무관" },
    { key: true, value: "연령 제한" }
  ],
  // 40대 이상 가능 여부
  isPossibleMiddleAge: [
    { key: false, value: "중년층 채용 불가" },
    { key: true, value: "중년층 채용 가능" }
  ],
  // 미용 라이센스
  designerLicenses: [
    { key: "자격증", value: "자격증" },
    { key: "면허증", value: "면허증" },
    { key: "상관없음", value: "상관없음" }
  ],
  // 매장 형태
  store: [
    { key: "소형샵 (25평 이하)", value: "소형샵 (25평 이하)" },
    { key: "중형샵 (60평 이하)", value: "중형샵 (60평 이상)" },
    { key: "대형샵 (60평 이상)", value: "대형샵 (60평 이상)" },
    { key: "남성전문 (맨즈살롱/바버샵)", value: "남성전문\n(맨즈살롱/바버샵)" },
    { key: "공유미용실", value: "공유미용실" }
  ],
  // 현재 직원수
  employeeCount: [
    { key: "3인 이하", value: "3인 이하" },
    { key: "4인 이상", value: "4인 이상" },
    { key: "7인 이상", value: "7인 이상" },
    { key: "10인 이상", value: "10인 이상" }
  ],
  // 인턴배정 시스템
  isExistedInternSystem: [
    { key: true, value: "있음" },
    { key: false, value: "없음" }
  ]
};
