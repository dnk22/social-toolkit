// Background service worker
import { Products } from '../utils/constants';

interface BackgroundMessage {
  action: string;
  url?: string;
  platform?: Products | null;
}

interface BackgroundResponse {
  status: string;
}

console.log('Social Toolkit background service worker started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
  console.log('Extension installed/updated:', details.reason);
  
  // Initialize storage
  chrome.storage.local.set({ 
    count: 0,
    installedAt: new Date().toISOString()
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener(
  (request: BackgroundMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: BackgroundResponse) => void) => {
    console.log('Background received message:', request);
    
    if (request.action === 'contentScriptLoaded') {
      console.log('Content script loaded on:', request.url);
      console.log('Platform detected:', request.platform);
      sendResponse({ status: 'acknowledged' });
    }
    
    return true;
  }
);

// Listen for tab updates (optional - for monitoring page changes)
chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('Tab updated:', tab.url);
  }
});

// Example: Context menu (right-click menu)
chrome.contextMenus.create({
  id: 'social-toolkit-action',
  title: 'Social Toolkit Action',
  contexts: ['selection', 'page']
});

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
  if (info.menuItemId === 'social-toolkit-action' && tab?.id) {
    console.log('Context menu clicked:', info);
    
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'highlight',
      count: 0
    });
  }
});
