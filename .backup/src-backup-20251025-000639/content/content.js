// Content script - runs in the context of web pages
console.log('Social Toolkit content script loaded');

// Detect current platform
const currentPlatform = detectPlatform();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleFeature') {
    console.log(`Feature ${request.enabled ? 'enabled' : 'disabled'} for ${request.platform}`);
    
    // Check if current page matches the platform
    if (currentPlatform === request.platform) {
      if (request.enabled) {
        activateFeatures(request.platform);
        createNotification(`✓ ${getPlatformName(request.platform)} features activated!`);
      } else {
        deactivateFeatures(request.platform);
        createNotification(`✗ ${getPlatformName(request.platform)} features deactivated`);
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
});

// Detect which platform we're on
function detectPlatform() {
  const hostname = window.location.hostname;
  
  if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
    return 'facebook';
  } else if (hostname.includes('instagram.com')) {
    return 'instagram';
  }
  
  return null;
}

function getPlatformName(platform) {
  const names = {
    'facebook': 'Facebook',
    'instagram': 'Instagram'
  };
  return names[platform] || platform;
}

// Activate features for specific platform
function activateFeatures(platform) {
  console.log(`Activating features for ${platform}`);
  
  // Load settings and apply features
  chrome.storage.local.get([`${platform}Enabled`], (result) => {
    const enabled = result[`${platform}Enabled`];
    
    if (enabled) {
      if (platform === 'facebook') {
        activateFacebookFeatures();
      } else if (platform === 'instagram') {
        activateInstagramFeatures();
      }
    }
  });
}

// Deactivate features
function deactivateFeatures(platform) {
  console.log(`Deactivating features for ${platform}`);
  
  if (platform === 'facebook') {
    deactivateFacebookFeatures();
  } else if (platform === 'instagram') {
    deactivateInstagramFeatures();
  }
}

// Facebook-specific features
function activateFacebookFeatures() {
  console.log('Facebook features activated');
  // Add your Facebook-specific code here
  // Example: Auto-scroll, download posts, etc.
  
  // Add a visual indicator
  addPlatformIndicator('Facebook', '#1877f2');
}

function deactivateFacebookFeatures() {
  console.log('Facebook features deactivated');
  removePlatformIndicator();
}

// Instagram-specific features
function activateInstagramFeatures() {
  console.log('Instagram features activated');
  // Add your Instagram-specific code here
  // Example: Story viewer, download media, etc.
  
  // Add a visual indicator
  addPlatformIndicator('Instagram', '#e1306c');
}

function deactivateInstagramFeatures() {
  console.log('Instagram features deactivated');
  removePlatformIndicator();
}

// Add platform indicator
function addPlatformIndicator(platformName, color) {
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

function removePlatformIndicator() {
  const existing = document.getElementById('social-toolkit-indicator');
  if (existing) {
    existing.remove();
  }
}

// Create a floating notification
function createNotification(message) {
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
    const enabled = result[`${currentPlatform}Enabled`];
    if (enabled) {
      activateFeatures(currentPlatform);
    }
  });
}
