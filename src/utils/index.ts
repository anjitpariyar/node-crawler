const { v4: uuidv4 } = require("uuid");

export function getAidFromUrl(url: string): string {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("aid");
}

export function getAidFromUrlDestination(url: string): string {
  const regex = /\/(\w{1,})-/;
  const match = url.match(regex);
  return match ? match[1] : uuidv4();
}

export const getDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(today.getDate() + 2);

  const formattedTomorrow = tomorrow.toISOString().slice(0, 10);
  const formattedDayAfterTomorrow = dayAfterTomorrow.toISOString().slice(0, 10);
  return [formattedTomorrow, formattedDayAfterTomorrow];
};
