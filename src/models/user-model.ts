export interface UserModel {
  AccessToken: string | null;
  CreatedAt: string; // ISO 8601 날짜 형식 (예: "2024-09-05T05:51:01.000Z")
  DisplayName: string;
  Email: string;
  FcmToken: string | null;
  Korean: string | null;
  LoginSession: string | null;
  LoginType: string | null;
  ProfilePictureURL: string | null;
  Role: string | null;
  Sex: string | null;
  UpdatedAt: string; // ISO 8601 날짜 형식 (예: "2024-09-05T05:51:01.000Z")
  UserID: string | null;
  appIdentifierId: string | null;
  id: string; // 숫자형 ID
  isExistPassword: boolean; // 비밀번호가 존재하는지 여부
  token: string; // JWT 토큰 문자열
  UserId: string | null; //
}
