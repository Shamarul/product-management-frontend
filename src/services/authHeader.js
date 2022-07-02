import AuthService from "../services/authServices";

export default function authHeader() {
  const user = AuthService.getCurrentUser()

  console.log('user', user);

  if (user) {
    return { Authorization: 'Bearer ' + user };
  } else {
    return {};
  }
}