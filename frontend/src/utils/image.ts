export function isValidImageUrl(url: any): url is string {
  return typeof url === "string" && url.startsWith("http");
} 