export function getAidFromUrl(url) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("aid");
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
