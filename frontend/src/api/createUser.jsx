import axios from "./axios";

export async function createUser(username) {
  const response = await axios.post(
    `/users?username=${encodeURIComponent(username)}`
  );
  return response.data;
}
