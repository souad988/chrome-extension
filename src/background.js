async function getCurrentTab(request) {
  let queryOptions = { currentWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let tabs = await chrome.tabs.query(queryOptions);
  console.log("tabbbb", tabs);
  return tabs;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("popup script triggered", request);
  getCurrentTab(request).then(sendResponse);
  return true;
});

console.log("from server provider");

// export async function getActiveTabURL() {
//   const tabs = await chrome.tabs.query({
//     currentWindow: true,
//     active: true,
//   });

//   return tabs[0];
// }

// chrome.runtime.sendMessage({ type: "NEW", tabs: ["item1"] }, (res) => {
//   console.log("response", res);
// });

// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if (tab.url) {
//     // const queryParameters = tab.url.split("?")[1];
//     // const urlParameters = new URLSearchParams(queryParameters);
//     chrome.tabs
//       .sendMessage(tabId, {
//         type: "NEW",
//         tabs: ["item1"],
//       })
//       .then((res) => console.log("response", res));
//   }
// });

// "content_scripts": [
// {
//     "matches": ["https://*", "http://*"],
//     "js": ["popup.js"]
// }
// ],
// "background": {
//         "service_worker": "background.js"
//     },

// "background": {
//     "scripts": [
//       "./static/js/background.js"
//     ],
//     "persistent": false
//     },
