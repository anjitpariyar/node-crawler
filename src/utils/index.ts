export function getAidFromUrl(url) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  return urlParams.get("aid");
}
