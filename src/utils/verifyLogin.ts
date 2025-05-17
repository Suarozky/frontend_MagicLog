export function hasAccessTokenCookie(): boolean {
  const cookies = document.cookie;
  const token = cookies
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

    

  return Boolean(token);
}
