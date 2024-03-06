import { API_BASE_URL } from "@/utils/constants";

export async function getAdmins() {
  try {
    const res = await fetch(`${API_BASE_URL}/users/admin`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
