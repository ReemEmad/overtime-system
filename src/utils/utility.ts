export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("userData") ?? "");
  return user.role;
};

export const getCreatedDate = (date: Date) => {
  return (
    new Date(date).getUTCDate() +
    "-" +
    (new Date(date).getMonth() + 1) +
    "-" +
    new Date(date).getFullYear()
  );
};