export interface SignUpReq {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  firstName?: string;
  lastName?: string;
  nickName?: string;
  role?: string;
  gender?: string;
  birthDate?: Date;
}

export interface ProfileUpdateReq {
  firstName?: string;
  lastName?: string;
  nickName?: string;
  role?: string;
  gender?: string;
  birthDate?: Date;
}

export interface LoginReq {
  email?: string;
  password?: string;
}