import React, { useEffect, useState } from "react";
import TotalSigners from "components/TotalSigners";
import { getActiveTabURL } from "./mypopup";
function App() {
  const [tabs, setTabs] = useState([]);
  const [open, setOpen] = useState("false");
  const [tab, setTab] = useState("");
  useEffect(async () => {
    const resp = await getActiveTabURL();
    console.log("resp current tab", resp);
    setTabs(resp);
  }, []);
  const openModal = (url) => {
    setTab(url);
    setOpen("true");
  };
  return (
    <div className="container">
      <h1>Hello!</h1>
      <ul id="tabs_list">
        {tabs.length > 0
          ? tabs.map((tab, index) => (
              <li key={`tab_${index}`} onClick={(e) => openModal(tab.url)}>
                {tab.url}
              </li>
            ))
          : "No tabs open"}
      </ul>
      {open && <TotalSigners open={open} tab={tab} setOpen={setOpen} />}
    </div>
  );
}

export default App;
