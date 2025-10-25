import { Products } from "../../utils/constants";

type Platform = Products | null;

// Detect which platform we're on
export function detectPlatform(): Platform {
  const hostname = window.location.hostname;
  switch (hostname) {
    case "facebook.com":
    case "fb.com":
      return Products.FACEBOOK;
    case "instagram.com":
      return Products.INSTAGRAM;
    default:
      return null;
  }
}
