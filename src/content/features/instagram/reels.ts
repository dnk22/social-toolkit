export function initReelsFeature() {
  console.log('✅ Reels feature initialized');
  console.log('📊 Current URL:', window.location.href);
  
  // Add visual indicator
  addReelsIndicator();
  
  // Add your Reels-specific code here
  console.log('⚙️ Ready to add Reels functionality (download, auto-play, etc.)');
}

function addReelsIndicator() {
  // Remove existing indicator if any
  const existing = document.getElementById('social-toolkit-reels-indicator');
  if (existing) {
    existing.remove();
  }

  // Create indicator
  const indicator = document.createElement('div');
  indicator.id = 'social-toolkit-reels-indicator';
  indicator.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 13px;
    font-weight: 600;
    z-index: 999999;
    box-shadow: 0 4px 15px rgba(188, 24, 136, 0.4);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideInRight 0.3s ease-out;
  `;
  indicator.innerHTML = `
    <span style="font-size: 16px;">🎬</span>
    <span>Instagram Reels Toolkit Active</span>
  `;
  
  // Add animation style
  if (!document.getElementById('social-toolkit-reels-styles')) {
    const style = document.createElement('style');
    style.id = 'social-toolkit-reels-styles';
    style.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(indicator);
  
  console.log('🎨 Visual indicator added to page');
}
