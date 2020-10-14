
export interface User{
    login: string;
    passwordHash: number;
    isAdministrator: boolean;
    id?: number;
    email?: string;
    image?: string;
    info?: string
    name?: string;
    phonenumber?: string;
    requisites?: string;
    site?: string
  }