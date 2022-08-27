chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.scripting.executeScript(
      {
        target: { tabId, allFrames: true },
        files: ['./fg.js']
      }
    );
  }
}); 

