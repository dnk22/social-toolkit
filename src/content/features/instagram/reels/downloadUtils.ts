import { REELS_CONSTANTS } from "./types";

/**
 * Video download functionality
 */

async function findVideoUrlFromScript() {
  const scripts = Array.from(document.scripts);
  for (const s of scripts) {
    const text = s.textContent;
    if (text && text.includes("video_versions")) {
      const match = text.match(/"url":"(https:[^"]+\.mp4[^"]*)"/);
      if (match && match[1]) {
        return decodeURIComponent(match[1]);
      }
    }
  }
  return null;
}

export async function downloadVideo(video: HTMLVideoElement): Promise<void> {
  try {
    // 1️⃣ Tìm URL video gốc
    const videoUrl = await findVideoUrlFromScript() || video.src || video.currentSrc;

    if (!videoUrl) {
      console.error("❌ Không tìm thấy video URL.");
      return;
    }

    // 2️⃣ Kiểm tra URL hợp lệ (Instagram thường có token dạng ?_nc_ht=...)
    if (!videoUrl.startsWith("https://scontent")) {
      console.warn("⚠️ Video URL có thể không hợp lệ:", videoUrl);
    }

    // 3️⃣ Fetch blob để bypass lỗi signature mismatch
    const response = await fetch(videoUrl, { mode: "cors" });
    if (!response.ok) throw new Error("Fetch video thất bại");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    // 4️⃣ Tạo link tải
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `instagram-reel-${Date.now()}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);
    console.log("✅ Video đã được tải thành công.");

  } catch (error) {
    console.error("❌ Lỗi tải video:", error);

    // Fallback: mở video trong tab mới
    try {
      const fallbackSrc = video.src || video.currentSrc;
      if (fallbackSrc) {
        window.open(fallbackSrc, "_blank");
        console.log("🔗 Video được mở trong tab mới (fallback)");
      }
    } catch (fallbackError) {
      console.error("❌ Fallback cũng lỗi:", fallbackError);
    }
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
