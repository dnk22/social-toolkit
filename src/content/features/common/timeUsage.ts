import { Products } from "../../../utils/constants";

interface TimeUsageData {
  date: string; // YYYY-MM-DD
  product: Products;
  startTime: number; // timestamp
  totalSeconds: number;
  sessions: number;
}

interface TimeUsageDisplay {
  hours: number;
  minutes: number;
  seconds: number;
}

export class TimeUsageTracker {
  private product: Products;
  private startTime: number;
  private timerInterval: number | null = null;
  private displayElement: HTMLDivElement | null = null;
  private currentSeconds: number = 0;

  constructor(product: Products) {
    this.product = product;
    this.startTime = Date.now();
  }

  /**
   * Khởi động tracker - load data từ storage và start timer
   */
  async start(): Promise<void> {
    await this.loadTodayUsage();
    this.createDisplayElement();
    this.startTimer();
  }

  /**
   * Load thời gian đã sử dụng trong ngày
   */
  private async loadTodayUsage(): Promise<void> {
    const today = this.getTodayDate();
    const storageKey = this.getStorageKey();

    return new Promise((resolve) => {
      chrome.storage.local.get([storageKey], (result) => {
        const data = result[storageKey] as TimeUsageData;

        if (data && data.date === today) {
          // Có data của hôm nay, load lại
          this.currentSeconds = data.totalSeconds;
        } else {
          // Ngày mới hoặc chưa có data, reset về 0
          this.currentSeconds = 0;
        }
        resolve();
      });
    });
  }

  /**
   * Tạo element hiển thị thời gian trên trang
   */
  private createDisplayElement(): void {
    // Remove existing if any
    const existing = document.getElementById(`time-usage-${this.product}`);
    if (existing) {
      existing.remove();
    }

    // Create display element
    this.displayElement = document.createElement("div");
    this.displayElement.id = `time-usage-${this.product}`;
    this.displayElement.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      padding: 14px 18px;
      z-index: 999999;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.12),
        0 2px 8px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.15),
        inset 0 -1px 0 rgba(0, 0, 0, 0.05);
      user-select: none;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: translateZ(0);
      will-change: transform, opacity;
      animation: slideInGlass 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    // Add animation keyframes
    if (!document.getElementById('liquid-glass-animations')) {
      const style = document.createElement('style');
      style.id = 'liquid-glass-animations';
      style.textContent = `
        @keyframes slideInGlass {
          from {
            opacity: 0;
            transform: translateX(100px) scale(0.8);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }
        
        @keyframes glassShimmer {
          0%, 100% {
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.12),
              0 2px 8px rgba(0, 0, 0, 0.08),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 rgba(0, 0, 0, 0.05);
          }
          50% {
            box-shadow: 
              0 12px 40px rgba(0, 0, 0, 0.15),
              0 4px 12px rgba(0, 0, 0, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.25),
              inset 0 -1px 0 rgba(0, 0, 0, 0.08);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Add hover effect
    this.displayElement.addEventListener('mouseenter', () => {
      if (this.displayElement) {
        this.displayElement.style.transform = 'scale(1.05) translateZ(0)';
        this.displayElement.style.background = 'rgba(255, 255, 255, 0.12)';
        this.displayElement.style.animation = 'glassShimmer 2s ease-in-out infinite';
      }
    });

    this.displayElement.addEventListener('mouseleave', () => {
      if (this.displayElement) {
        this.displayElement.style.transform = 'scale(1) translateZ(0)';
        this.displayElement.style.background = 'rgba(255, 255, 255, 0.08)';
        this.displayElement.style.animation = 'none';
      }
    });

    this.displayElement.innerHTML = this.getDisplayHTML();
    document.body.appendChild(this.displayElement);
  }

  /**
   * Get HTML content cho display element
   */
  private getDisplayHTML(): string {
    const { hours, minutes, seconds } = this.parseSeconds(this.currentSeconds);

    return `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 2px;
      ">
        ⏱️
        <div style="
          display: flex;
          flex-direction: column;
          gap: 2px;
        ">
          <div style="
            font-family: 'SF Mono', 'SF Pro Rounded', 'Menlo', monospace;
            font-size: 18px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 1.2px;
            text-shadow: 
              0 1px 2px rgba(0, 0, 0, 0.4),
              0 0 10px rgba(255, 255, 255, 0.1);
            background: linear-gradient(135deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          ">
            ${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Bắt đầu đếm thời gian
   */
  private startTimer(): void {
    // Update mỗi giây
    this.timerInterval = window.setInterval(() => {
      this.currentSeconds++;
      this.updateDisplay();

      // Lưu vào storage mỗi 10 giây
      if (this.currentSeconds % 10 === 0) {
        this.saveToStorage();
      }
    }, 1000);
  }

  /**
   * Update display element
   */
  private updateDisplay(): void {
    if (this.displayElement) {
      this.displayElement.innerHTML = this.getDisplayHTML();
    }
  }

  /**
   * Lưu data vào Chrome storage
   */
  private async saveToStorage(): Promise<void> {
    const today = this.getTodayDate();
    const storageKey = this.getStorageKey();

    const data: TimeUsageData = {
      date: today,
      product: this.product,
      startTime: this.startTime,
      totalSeconds: this.currentSeconds,
      sessions: 1,
    };

    return new Promise((resolve) => {
      chrome.storage.local.set({ [storageKey]: data }, () => {
        resolve();
      });
    });
  }

  /**
   * Dừng tracker và lưu data cuối cùng
   */
  async stop(): Promise<void> {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    await this.saveToStorage();

    if (this.displayElement) {
      this.displayElement.remove();
      this.displayElement = null;
    }
  }

  /**
   * Get storage key cho product
   */
  private getStorageKey(): string {
    return `timeUsage_${this.product}_today`;
  }

  /**
   * Get today's date trong format YYYY-MM-DD
   */
  private getTodayDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Parse seconds thành hours, minutes, seconds
   */
  private parseSeconds(totalSeconds: number): TimeUsageDisplay {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  }

  /**
   * Pad number với leading zero
   */
  private pad(num: number): string {
    return String(num).padStart(2, "0");
  }
}

/**
 * Khởi tạo time usage tracker cho một product
 */
export async function initTimeUsageTracker(
  product: Products
): Promise<TimeUsageTracker> {
  const tracker = new TimeUsageTracker(product);
  await tracker.start();

  // Cleanup khi tab bị đóng hoặc navigate away
  window.addEventListener("beforeunload", () => {
    tracker.stop();
  });

  return tracker;
}

/**
 * Lấy time usage history (cho báo cáo)
 */
export async function getTimeUsageHistory(
  product: Products,
  days: number = 7
): Promise<TimeUsageData[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (result) => {
      const history: TimeUsageData[] = [];
      const prefix = `timeUsage_${product}_`;

      for (const [key, value] of Object.entries(result)) {
        if (key.startsWith(prefix)) {
          history.push(value as TimeUsageData);
        }
      }

      // Sort by date descending
      history.sort((a, b) => b.date.localeCompare(a.date));

      // Take only last N days
      resolve(history.slice(0, days));
    });
  });
}
