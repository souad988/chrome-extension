import React, { useEffect, useState } from "react";
import TotalSigners from "components/totalSignersModal";
import { ListGroup } from "react-bootstrap";
import { getActiveTabURL } from "../mypopup";
import CustodyContractService from "contracts/CustodyContractService";
import { Spinner } from "react-bootstrap";
import CreateVault from "buttons/createVault";
import PromptSignatures from "buttons/promptSignatures";
import AddParticipant from "buttons/addParticipant";
import TotalSignersModal from "components/totalSignersModal";
//import { isDev } from "../App";
import WalletInfo from "components/walletInfo";
import { useAppData } from "contexts/appData";
const ethers = require("ethers");
console.log("test en var", process.env.NODE_ENV);
console.log("api key", process.env.REACT_APP_MNEMONICS);
const signersMnemonics = JSON.parse(process.env.REACT_APP_MNEMONICS);

function HomePage() {
  const [tabs, setTabs] = useState([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("");
  const [totalSigners, setTotalSigners] = useState();
  const [minimumSigners, setMinimumSigners] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [shares, setShares] = useState([]);
  const [quorumDefined, setQuorumDefined] = useState(false);

  const { signers, setSigners, loadingBalances } = useAppData();

  const signersArray = Object.values(signers);

  useEffect(() => {
    let randomWallet = ethers.Wallet.createRandom();
    setPrivateKey(randomWallet.privateKey);
    // console.log("Json", JSON.parse(process.env.REACT_APP_MNEMONICS));
  }, []);

  // useEffect(() => {
  //   if (minimumSigners && privateKey) {
  //     createShards();
  //   }
  // }, [minimumSigners, privateKey]);

  // const createShards = () => {
  //   var shares = window.secrets.share(
  //     privateKey.substring(minimumSigners),
  //     totalSigners,
  //     minimumSigners
  //   );
  //   setShares(shares);
  // };

  // const getContract = (data) => {
  //   return new CustodyContractService(data.mnemonic, data.id);
  // };

  const onChangeTotalSigners = (value, minimumSigners) => {
    const signers = {};
    const totalSigners = Number(value);
    const signersWalletsKeys = Object.keys(signersMnemonics);
    signersWalletsKeys.map((s, i) => {
      if (totalSigners >= i + 1) {
        const item = {
          mnemonic: signersMnemonics[s],
          // email: !i ? "creator@email.com" : `signer${s}@email.com`,
          id: `id_${i}`,
          //   pin: `123${i}`,
        };
        item.contract = getContract(item);
        if (isDev) {
          item.pin = `123${i}`;
          item.defaultEmail = !i
            ? "signer@email.com"
            : `cosigner${s}@email.com`;
        }
        signers[s] = item;
      }
    });
    setSigners(signers);
    setTotalSigners(value);
    setMinimumSigners(minimumSigners);
  };

  // const onEmailChange = (email, index) => {
  //   const newSigners = { ...signers };
  //   const signerItem = newSigners[index.toString()];
  //   signerItem.email = email;
  //   newSigners[index.toString()] = signerItem;
  //   setSigners(newSigners);
  // };

  // const onParticipantAdded = (index) => {
  //   const newSigners = { ...signers };
  //   const signerItem = newSigners[index.toString()];
  //   signerItem.isAdded = true;
  //   newSigners[index.toString()] = signerItem;
  //   const creator = newSigners["0"];
  //   creator.participants = (creator.participants || 0) + 1;
  //   newSigners["0"] = creator;
  //   setSigners(newSigners);
  // };

  useEffect(async () => {
    const resp = await getActiveTabURL();
    console.log("resp current tab", resp);
    setTabs(resp);
  }, []);
  const openModal = (url) => {
    setTab(url);
    setOpen(true);
  };

  return (
    <div className="container">
      {open ? (
        <TotalSignersModal
          open={open}
          tab={tab}
          setOpen={setOpen}
          totalSigners={totalSigners}
          setTotalSigners={onChangeTotalSigners}
        />
      ) : (
        <>
          <h1>Hello!</h1>
          <ListGroup>
            {tabs.length > 0
              ? tabs.map((tab, index) => (
                  <ListGroup.Item
                    action
                    key={`tab_url_${index}`}
                    onClick={(e) => openModal(tab.url)}
                  >
                    {tab.url}
                  </ListGroup.Item>
                ))
              : "No tabs open"}
          </ListGroup>
        </>
      )}
    </div>
  );
}

export default HomePage;
