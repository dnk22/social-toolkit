import { useEffect, useState } from "react";
import { ProductEnabledStorageKeys, Products } from "../utils/constants";

export interface Settings {
  facebook: boolean;
  instagram: boolean;
}

export default function usePopupHook() {
  const [settings, setSettings] = useState<Settings>({
    facebook: false,
    instagram: false,
  });

  useEffect(() => {
    // Load saved settings from storage
    chrome.storage.local.get(
      [
        ProductEnabledStorageKeys.FACEBOOK_ENABLED,
        ProductEnabledStorageKeys.INSTAGRAM_ENABLED,
      ],
      (result) => {
        setSettings({
          facebook: result[ProductEnabledStorageKeys.FACEBOOK_ENABLED] || false,
          instagram:
            result[ProductEnabledStorageKeys.INSTAGRAM_ENABLED] || false,
        });
      }
    );
  }, []);

  const toggleSetting = (platform: Products) => {
    const newSettings: Settings = {
      ...settings,
      [platform]: !settings[platform],
    };

    setSettings(newSettings);

    // Save to storage
    const storageKey =
      platform === Products.FACEBOOK
        ? ProductEnabledStorageKeys.FACEBOOK_ENABLED
        : ProductEnabledStorageKeys.INSTAGRAM_ENABLED;
    chrome.storage.local.set({ [storageKey]: newSettings[platform] });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs
          .sendMessage(tabs[0].id, {
            action: "toggleFeature",
            platform: platform,
            enabled: newSettings[platform],
          })
          .catch(() => {
            // Ignore errors if content script not loaded
          });
      }
    });
  };
  return { settings, toggleSetting };
}
