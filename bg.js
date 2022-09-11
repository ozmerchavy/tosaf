const NEW_TAB = 'chrome://newtab/';


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  console.log(changeInfo);

  if (changeInfo.status == 'loading') {

    console.log(tab)

    if (tab.url == NEW_TAB) return;

    chrome.scripting.executeScript(
      {
        target: { tabId, allFrames: false },
        files: ['./fg.js']
      }
    );
  }
}); 

