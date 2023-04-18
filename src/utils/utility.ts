export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("userData") ?? "");
  return user.role;
};
