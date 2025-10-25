/**
 * Notification utility for showing toast messages
 */

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationConfig {
  type: NotificationType;
  message: string;
  duration?: number;
  title?: string;
}

const NOTIFICATION_STYLES = {
  success: {
    background: "rgba(16, 185, 129, 0.95)",
    icon: "✅",
    borderColor: "rgba(16, 185, 129, 0.3)",
  },
  error: {
    background: "rgba(239, 68, 68, 0.95)",
    icon: "❌",
    borderColor: "rgba(239, 68, 68, 0.3)",
  },
  warning: {
    background: "rgba(245, 158, 11, 0.95)",
    icon: "⚠️",
    borderColor: "rgba(245, 158, 11, 0.3)",
  },
  info: {
    background: "rgba(59, 130, 246, 0.95)",
    icon: "ℹ️",
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
};

const DEFAULT_DURATION = 4000;
const CONTAINER_ID = "social-toolkit-notifications";

/**
 * Get or create notification container
 */
function getNotificationContainer(): HTMLDivElement {
  let container = document.getElementById(
    CONTAINER_ID
  ) as HTMLDivElement | null;

  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.style.cssText = `
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  return container;
}

/**
 * Show a notification toast
 */
export function showNotification(config: NotificationConfig): void {
  const { type, message, duration = DEFAULT_DURATION, title } = config;
  const style = NOTIFICATION_STYLES[type];

  const container = getNotificationContainer();

  const notification = document.createElement("div");
  notification.style.cssText = `
    background: ${style.background};
    color: white;
    padding: 16px 20px;
    border-radius: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px ${style.borderColor};
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 14px;
    max-width: 380px;
    pointer-events: auto;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(120%);
    opacity: 0;
    animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: start; gap: 12px;">
      <div style="font-size: 20px; line-height: 1; flex-shrink: 0; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));">
        ${style.icon}
      </div>
      <div style="flex: 1; min-width: 0;">
        ${
          title
            ? `<div style="font-weight: 700; margin-bottom: 4px; font-size: 15px;">${title}</div>`
            : ""
        }
        <div style="opacity: 0.95; line-height: 1.5; word-wrap: break-word;">
          ${message}
        </div>
      </div>
      <div style="font-size: 18px; opacity: 0.6; cursor: pointer; flex-shrink: 0; margin-left: 8px; transition: opacity 0.2s;" 
           onmouseover="this.style.opacity='1'" 
           onmouseout="this.style.opacity='0.6'">
        ×
      </div>
    </div>
  `;

  // Add animation styles
  const styleSheet = document.getElementById("notification-animations");
  if (!styleSheet) {
    const style = document.createElement("style");
    style.id = "notification-animations";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(120%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(120%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  container.appendChild(notification);

  // Click to close
  const closeBtn = notification.querySelector("div:last-child");
  const close = () => {
    notification.style.animation =
      "slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards";
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
      // Remove container if empty
      if (container.children.length === 0 && document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 300);
  };

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });

  notification.addEventListener("click", close);

  // Auto close
  setTimeout(close, duration);

  // Hover to pause auto-close
  let autoCloseTimeout: number | null = null;
  notification.addEventListener("mouseenter", () => {
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout);
      autoCloseTimeout = null;
    }
  });
}

/**
 * Convenience methods
 */
export const notification = {
  success: (message: string, title?: string) =>
    showNotification({ type: "success", message, title }),
  error: (message: string, title?: string) =>
    showNotification({ type: "error", message, title }),
  warning: (message: string, title?: string) =>
    showNotification({ type: "warning", message, title }),
  info: (message: string, title?: string) =>
    showNotification({ type: "info", message, title }),
};
