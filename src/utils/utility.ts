export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("userData") ?? "");
  return user.role;
};

export const getCreatedDate = (date: Date) => {
  return (
    new Date(date).getUTCDate() +
    "/" +
    (new Date(date).getMonth() + 1) +
    "/" +
    new Date(date).getFullYear()
  );
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
