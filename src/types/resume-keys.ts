// // 프로필 이미지 url
// export type ProfileImageUriKey = string;

// // 프로필 이미지 썸네일 url
// export type ProfileImageThumbnailUriKey = string;

// 디자이너의 한 줄 소개 표시, 최대 22자

// 이름

// 지역

// 나이

// 지원분야
export type RoleKeyResume = "디자이너" | "인턴";

// 근무 형태
export type WorkTypeKeyResume = "정규직" | "스페어(알바)" | "상관없음";

// 정착 지원금 - 디자이너
export type SettlementAllowanceKeyResume =
  | "150만원 이상"
  | "200만원 이상"
  | "250만원 이상"
  | "300만원 이상"
  | "상관없음";

// 라이센스
export type DesignerLicencesKeyResume = "자격증" | "면허증" | "상관없음";

// 디자이너 경력 - 디자이너
export type DesignerExperienceYearNumberKeyResume =
  | "1년 이하"
  | "2년 이하"
  | "3년 이하"
  | "4년 이하"
  | "5년 이하"
  | "6년 이상";

// 희망 급여 - 인턴
export type InternExpectedSalaryKeyResume =
  | "150만원 이상"
  | "170만원 이상"
  | "190만원 이상"
  | "210만원 이상"
  | "230만원 이상"
  | "상관없음";

// 인턴 경력 - 인턴
export type InternExperienceYearNumberKeyResume =
  | "신입"
  | "1년 이하"
  | "2년 이하"
  | "3년 이하"
  | "4년 이하"
  | "5년 이하"
  | "6년 이상";

// // 주요 경력 회사명
// export type DesignerMajorExperienceCompanyNameKeyResume = string;

// // 주요 경력 기간
// export type DesignerMajorExperienceDurationKeyResume = string;

// // 주요 경력 역할
// export type DesignerMajorExperienceRoleKeyResume = string;

// // 희망 교육 - 인턴

// 이전 3개월 평균 매출
export type SalesLast3MonthsAvgKeyResume =
  | "500만원 이하"
  | "500만원 이상"
  | "1000만원 이상"
  | "1500만원 이상";

// 학력
export type CompletedEducationLevelKeyResume =
  | "미용고등학교 졸업"
  | "미용대학교 졸업"
  | "일반고등학교 졸업"
  | "일반대학교 졸업"
  | "해당없음";

// 희망휴무일(중복가능)
export type PreferredOffDaysKeyResume =
  | "월"
  | "화"
  | "수"
  | "목"
  | "금"
  | "토"
  | "일"
  | "상관없음";

// 근무주기(중복가능)
export type WorkCycleTypesKeyResume =
  | "주 4일"
  | "주 5일"
  | "주 6일"
  | "격주 5일";

// 디자이너 승급기간 - 인턴
export type DesignerPromotionPeriodKeyResume =
  | "1년 이하"
  | "1년 6개월 이하"
  | "2년 이하"
  | "3년 미만"
  | "3년 이상"
  | "상관없음";

// 기숙사
export type IsPreferredDormitorySupportKeyResume = boolean;

// 희망 교육 - 디자이너
export type PreferredMonthlyEducationDesignerCountKeyResume =
  | "월 1회 이상"
  | "월 2회 이상"
  | "월 3회 이상"
  | "상관없음";

// 희망 교육 - 인턴
export type PreferredMonthlyEducationInternCountKeyResume =
  | "월 2회 이하"
  | "월 3회 이상"
  | "월 4회 이상"
  | "상관없음";

// 식대 지원
export type IsPreferredMealSupportKeyResume = boolean;

// 주차 희망 여부
export type IsPreferredParkingKeyResume = boolean;

// // MBTI
// export type MbtiKeyResume = string;

// // 자기소개서 최대 300자
// export type DescriptionKeyResume = string;
