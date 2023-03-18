export const getCreatedDate = (created_date: any) => {
  return `${
    new Date(created_date).getUTCDate() -
    new Date(created_date).getMonth() +
    1 -
    new Date(created_date).getFullYear()
  }`;
};
