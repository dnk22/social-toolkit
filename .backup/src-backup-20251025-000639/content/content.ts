// Content script - runs in the context of web pages
import { Products } from '../utils/constants';

type Platform = Products | null;

interface MessageRequest {
  action: string;
  platform?: Products;
  enabled?: boolean;
  count?: number;
}

interface MessageResponse {
  status: string;
  platform?: Platform;
}

console.log('Social Toolkit content script loaded');

// Detect current platform
const currentPlatform = detectPlatform();

// Listen for messages from popup
chrome.runtime.onMessage.addListener(
  (request: MessageRequest, sender: chrome.runtime.MessageSender, sendResponse: (response: MessageResponse) => void) => {
    if (request.action === 'toggleFeature') {
      console.log(`Feature ${request.enabled ? 'enabled' : 'disabled'} for ${request.platform}`);
      
      // Check if current page matches the platform
      if (currentPlatform === request.platform) {
        if (request.enabled) {
          activateFeatures(request.platform!);
          createNotification(`✓ ${getPlatformName(request.platform!)} features activated!`);
        } else {
          deactivateFeatures(request.platform!);
          createNotification(`✗ ${getPlatformName(request.platform!)} features deactivated`);
        }
      }
      
      sendResponse({ status: 'success', platform: currentPlatform });
    }
    
    if (request.action === 'highlight') {
      console.log('Received highlight action, count:', request.count);
      createNotification(`Feature activated! Count: ${request.count}`);
      sendResponse({ status: 'success' });
    }
    
    return true;
  }
);

// Detect which platform we're on
function detectPlatform(): Platform {
  const hostname = window.location.hostname;
  
  if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
    return Products.FACEBOOK;
  } else if (hostname.includes('instagram.com')) {
    return Products.INSTAGRAM;
  }
  
  return null;
}

function getPlatformName(platform: Products): string {
  const names: Record<Products, string> = {
    [Products.FACEBOOK]: 'Facebook',
    [Products.INSTAGRAM]: 'Instagram'
  };
  return names[platform] || platform;
}

// Activate features for specific platform
function activateFeatures(platform: Products): void {
  console.log(`Activating features for ${platform}`);
  
  // Load settings and apply features
  chrome.storage.local.get([`${platform}Enabled`], (result) => {
    const enabled = result[`${platform}Enabled`] as boolean;
    
    if (enabled) {
      if (platform === Products.FACEBOOK) {
        activateFacebookFeatures();
      } else if (platform === Products.INSTAGRAM) {
        activateInstagramFeatures();
      }
    }
  });
}

// Deactivate features
function deactivateFeatures(platform: Products): void {
  console.log(`Deactivating features for ${platform}`);
  
  if (platform === Products.FACEBOOK) {
    deactivateFacebookFeatures();
  } else if (platform === Products.INSTAGRAM) {
    deactivateInstagramFeatures();
  }
}

// Facebook-specific features
function activateFacebookFeatures(): void {
  console.log('Facebook features activated');
  // Add your Facebook-specific code here
  // Example: Auto-scroll, download posts, etc.
  
  // Add a visual indicator
  addPlatformIndicator('Facebook', '#1877f2');
}

function deactivateFacebookFeatures(): void {
  console.log('Facebook features deactivated');
  removePlatformIndicator();
}

// Instagram-specific features
function activateInstagramFeatures(): void {
  console.log('Instagram features activated');
  // Add your Instagram-specific code here
  // Example: Story viewer, download media, etc.
  
  // Add a visual indicator
  addPlatformIndicator('Instagram', '#e1306c');
}

function deactivateInstagramFeatures(): void {
  console.log('Instagram features deactivated');
  removePlatformIndicator();
}

// Add platform indicator
function addPlatformIndicator(platformName: string, color: string): void {
  removePlatformIndicator(); // Remove existing first
  
  const indicator = document.createElement('div');
  indicator.id = 'social-toolkit-indicator';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${color};
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    z-index: 999998;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  `;
  indicator.textContent = `🚀 ${platformName} Toolkit Active`;
  document.body.appendChild(indicator);
}

function removePlatformIndicator(): void {
  const existing = document.getElementById('social-toolkit-indicator');
  if (existing) {
    existing.remove();
  }
}

// Create a floating notification
function createNotification(message: string): void {
  // Remove existing notification if any
  const existing = document.getElementById('social-toolkit-notification');
  if (existing) {
    existing.remove();
  }
  
  // Create new notification
  const notification = document.createElement('div');
  notification.id = 'social-toolkit-notification';
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 999999;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Add CSS animation
  if (!document.getElementById('social-toolkit-styles')) {
    const style = document.createElement('style');
    style.id = 'social-toolkit-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
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
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Send message to background script on load
chrome.runtime.sendMessage({ 
  action: 'contentScriptLoaded',
  url: window.location.href,
  platform: currentPlatform
});

// Check if features should be enabled on page load
if (currentPlatform) {
  chrome.storage.local.get([`${currentPlatform}Enabled`], (result) => {
    const enabled = result[`${currentPlatform}Enabled`] as boolean;
    if (enabled) {
      activateFeatures(currentPlatform);
    }
  });
}
