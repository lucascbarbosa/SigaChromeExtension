chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, { file: "content.js" });
  chrome.tabs.executeScript(null, { file: "eventSave.js" });
});
