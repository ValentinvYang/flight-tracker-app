import axios from "./axios";

export async function login({ username, email, password }) {
  const requestBody = { password };

  if (username) {
    requestBody.username = username;
  }

  if (email) {
    requestBody.email = email;
  }

  const response = await axios.post(`/login`, requestBody);
  return response.data;
}

export async function createUser({ username, email, password }) {
  const response = await axios.post(`/signup`, { username, email, password });
  return response.data;
}
