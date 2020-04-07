chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "./js/content.js"});
  
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  tabs_created_by_extension.push(request.url)
});

chrome.tabs.onUpdated.addListener(function (tabId,info,tab) {
  if(tab.url.startsWith('https://calendar.google.com/calendar/r/eventedit?location=')){
    if (info.status === 'complete') {
        chrome.tabs.executeScript(tabId, {file: "./js/newtab.js"});
        sleep(500);
        chrome.tabs.remove(tabId);
    }
  }
});

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}
