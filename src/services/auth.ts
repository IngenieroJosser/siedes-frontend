import { api } from "@/lib/api";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "@/lib/type";

export async function login(dtoSignIn: LoginRequest): Promise<LoginResponse> {
  return await api.post<LoginResponse>('/auth/login', dtoSignIn);
}

export async function register(dtoSignUp: RegisterRequest): Promise<RegisterResponse> {
  return await api.post<RegisterResponse>('/auth/register', dtoSignUp);
}