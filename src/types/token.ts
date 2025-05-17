interface Role {
  id: number;
  name: string;
}

export interface TokenPayload {
  email: string;
  sub: number;
  role: Role;
  iat: number;
  exp: number;
}
