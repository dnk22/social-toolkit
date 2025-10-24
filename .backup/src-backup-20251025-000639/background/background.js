// Background service worker
console.log('Social Toolkit background service worker started');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed/updated:', details.reason);
  
  // Initialize storage
  chrome.storage.local.set({ 
    count: 0,
    installedAt: new Date().toISOString()
  });
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Background received message:', request);
  
  if (request.action === 'contentScriptLoaded') {
    console.log('Content script loaded on:', request.url);
    console.log('Platform detected:', request.platform);
    sendResponse({ status: 'acknowledged' });
  }
  
  return true;
});

// Listen for tab updates (optional - for monitoring page changes)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
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

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'social-toolkit-action') {
    console.log('Context menu clicked:', info);
    
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: 'highlight',
      count: 0
    });
  }
});
