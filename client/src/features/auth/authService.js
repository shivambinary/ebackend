import { loginAPI, registerAPI } from "./authAPI";

export const loginUser = async (data) => {
  const res = await loginAPI(data);
  return res.data.data;   // ✅ ONLY { user, token }
};

export const registerUser = async (data) => {
  const res = await registerAPI(data);
  return res.data.data;   // ✅ ONLY { user, token }
};
