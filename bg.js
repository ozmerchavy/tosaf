const NEW_TAB = 'chrome://newtab/';


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

  console.log(changeInfo);

  if (changeInfo.status == 'loading') {

    
    if (tab.url == NEW_TAB) return;
    
    console.log('runnin on tab', tab)

    chrome.scripting.executeScript(
      {
        target: { tabId, allFrames: false },
        files: ['./fg.js'],
      }
    );
  }
}); 

