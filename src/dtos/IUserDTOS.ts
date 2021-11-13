export interface IUserDTOS {
  id: string;
  email: string;
  cpf: number;
  name: string;
  password: string;
  phone: string;
  birthDate: Date;
  typeCreated: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
  numberAccess: number;
  refreshToken: string;
  emailActive: boolean;
  emailActiveToken: string;
  avatar?: string;
  avatarUrl?: string;
}