export const getUserRole = () => {
  const userString = localStorage.getItem("userData");

  if (userString) {
    const user = JSON.parse(userString);
    return user.role;
  }

  return null;
};

export const getCreatedDate = (date: string | Date | Dayjs | undefined) => {
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

  return color;
}

export const stringAvatar = (name: string) => {
  const names = name.split(" ");
  const firstName = names[0];
  const lastName = names.length > 1 ? names[1] : "";

  const firstInitial = firstName.charAt(0);
  const secondInitial = lastName.charAt(0);

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: firstInitial + (secondInitial || ""),
  };
};

