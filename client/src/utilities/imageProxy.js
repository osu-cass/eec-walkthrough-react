import { API_URL } from "./constants";

export function proxyImage(url) {
  if (!url) return url;
  
  // Already a same-origin path, so no proxy is needed
  if (url.startsWith("/") || url.startsWith(window.location.origin)) return url;
  return `${API_URL}/images/proxy?url=${encodeURIComponent(url)}`;
}