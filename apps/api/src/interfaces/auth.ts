export interface IAuthUser {
  uid: number;
  pv: number;
  exp?: number;
  iat?: number;
  roles?: string[];
}
