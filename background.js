let currentConvertedValue = "";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertedValue",
    title: "Converted: ",
    contexts: ["selection"],
    visible: false
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'ConvertedNumber') {
    currentConvertedValue = message.value;
    chrome.contextMenus.update("convertedValue", {
      title: "Converted: " + message.value,
      visible: true
    });
  } else if (message.type === 'HideContextMenu') {
    currentConvertedValue = "";
    chrome.contextMenus.update("convertedValue", {
      visible: false
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertedValue" && currentConvertedValue) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (text) => {
        navigator.clipboard.writeText(text);
      },
      args: [currentConvertedValue]
    });
  }
});
