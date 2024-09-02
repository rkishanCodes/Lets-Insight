import axios from "axios";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:5002/api/v0/auth/profile",
        config
      ); // Adjust API endpoint as needed
      return data;
    } catch (error) {
      console.log("Error fetching profile info:", error);
      return null;
    }
  }
  return null;
};

export const logout = (navigate) => {
  localStorage.removeItem("token");
  navigate("/login");
};
