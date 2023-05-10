import { axiosConnect } from "../config/intercepter";

export const registerUser = async (formData) => {
  try {
    const response = await axiosConnect().post("auth/register", formData);
    if (response.data) {
      console.log(response.data.userId);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    localStorage.setItem("isLoggedIn", true);

    return response;
  } catch (error) {
    return [];
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axiosConnect().post("auth/login", {
      email,
      password,
    });
    if (response.data.token) {
      console.log(response.data.userId);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    localStorage.setItem("isLoggedIn", true);

    return response;
  } catch (error) {
    return [];
  }
};

export const getCurrentUserId = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.userId : null;
};
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
};
export const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user : null;
};
