interface ILoginUser {
  email: string;
  password: string;
  isGoogleAuth?: boolean;
}
interface IRegisterUser {
  id?: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  isGoogleAuth?: boolean;
}

export { ILoginUser, IRegisterUser };
