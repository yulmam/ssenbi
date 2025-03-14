import { LoginFormData } from "@/types/member/memberTypes";
import axiosInstance from "../axiosInstance";
import Cookies from "js-cookie";

// Post Login API
export const postLoginAPI = async (formData: LoginFormData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  const accessToken = response.headers["authorization"];

  // 응답 코드가 SUCCESS인 경우
  if (response.data.code === "S10000" && accessToken !== undefined) {
    Cookies.set("accessToken", accessToken, { expires: 1 }); //쿠키 생성 시점으로부터 1일 후에 만료
    return true;
  }

  return false;
};

// Post Logout API
export const postLogoutAPI = async ({ token }: { token: string }) => {
  const response = await axiosInstance.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  // 응답 코드가 SUCCESS인 경우
  if (response.data.code === "S10000") {
    Cookies.remove("accessToken");
  }

  return response.data;
};

// 토큰 재발급 API
export const postRefreshTokenAPI = async () => {
  const response = await axiosInstance.post(
    "/auth/refresh",
    {},
    {
      withCredentials: true,
    },
  );

  const accessToken = response.headers["authorization"];

  if (response.data.code === "S10000" && accessToken !== undefined) {
    Cookies.set("accessToken", response.data.accessToken, { expires: 1 });
    return true;
  }

  return false;
};
