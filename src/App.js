import React, { useEffect, useState } from "react";
import { getCurrentTabs } from "./mypopup";
function App() {
  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    getCurrentTabs(setTabs);
    // const queryInfo = { active: true, lastFocusedWindow: true };
    // console.log("tab", chrome, chrome.tabs);
    // chrome.tabs &&
    //   chrome.tabs.query(queryInfo, (tabs) => {
    //     const url = tabs[0].url;
    //     setTabs([url]);
    //   });
  }, []);
  useEffect(() => {
    console.log("tabs updated", tabs);
  }, [tabs]);
  return (
    <div className="container">
      <h1>Hello!</h1>
      <ul id="tabs_list">
        {tabs.length > 0
          ? tabs.map((tab, index) => <li key={`tab_${index}`}>{tab.url}</li>)
          : "No tabs open"}
      </ul>
    </div>
  );
}

export default App;
