import { REELS_CONSTANTS } from "./types";
import { notification } from "../../../../utils/notification";

/**
 * Video download functionality
 */
async function findVideoUrlFromScript(): Promise<string | null> {
  const scripts = Array.from(document.scripts);
  for (const s of scripts) {
    const text = s.textContent;
    if (text && text.includes("video_versions")) {
      const match = text.match(/"url":"(https:[^"]+\.mp4[^"]*)"/);
      if (match && match[1]) {
        return decodeURI(match[1].replace(/\\/g, ""));
      }
    }
  }

  return null;
}

export async function downloadVideo(video: HTMLVideoElement): Promise<void> {
  try {
    // 1️⃣ Tìm URL video gốc từ nhiều nguồn
    let videoUrl = await findVideoUrlFromScript();
    console.log(videoUrl, "videoUrl");

    if (!videoUrl) {
      // Fallback đến video element
      videoUrl = video.currentSrc || video.src;
    }

    if (!videoUrl) {
      notification.error("Không tìm thấy video URL", "Lỗi Download");
      return;
    }
    // 3️⃣ Xử lý HTTPS URLs (Instagram CDN)
    if (videoUrl.startsWith("https://")) {
      try {
        // Thử fetch trực tiếp
        const response = await fetch(videoUrl, {
          mode: "cors",
          referrer: "https://www.instagram.com/",
          headers: {
            "User-Agent": navigator.userAgent,
            Referer: "https://www.instagram.com/",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `instagram-reel-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        notification.success("Video đã được tải xuống!", "Thành công");
        return;
      } catch (httpsError) {
        notification.error(`Lỗi tải: ${httpsError}`, "Tải HTTPS thất bại");
      }
    }
  } catch (error) {
    notification.error(`${error}`, "Lỗi Download");
  }
}
/**
 * Add visual feedback for download button
 */
export function addDownloadFeedback(button: HTMLButtonElement): void {
  const originalIcon = button.innerHTML;
  button.innerHTML = "✅";
  button.style.transform = "scale(0.9)";

  setTimeout(() => {
    button.innerHTML = originalIcon;
    button.style.transform = "scale(1)";
  }, REELS_CONSTANTS.DOWNLOAD_FEEDBACK_DURATION);
}

/**
 * Add visual feedback for seek buttons
 */
export function addSeekFeedback(button: HTMLButtonElement): void {
  button.style.transform = "scale(0.85)";
  setTimeout(() => {
    button.style.transform = "scale(1)";
  }, REELS_CONSTANTS.FEEDBACK_DURATION);
}
