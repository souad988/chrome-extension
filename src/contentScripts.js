export async function getCurrentTabs() {
  console.log("getCurrentTabs triggered");
  const response = await chrome.runtime.sendMessage("getStuff");
  console.log("response", response);
  console.log("response from service provider");
      document.getElementById("tabs_list").innerHTML = res
        .map((item, index) => `<li id='tab_${index}'>${item.url}</li>`)
        .join("");
  //   .then((res) => {
  //     console.log('response from service provider')
  //     document.getElementById("tabs_list").innerHTML = res
  //       .map((item, index) => `<li id='tab_${index}'>${item.url}</li>`)
  //       .join("");
  //     console.log("response", res);
  //     setState((state) => {
  //       return { ...state, tabs: [...res] };
  //     });
  //   });
}
getCurrentTabs()