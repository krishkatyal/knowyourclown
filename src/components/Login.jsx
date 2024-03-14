import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
import MetaMaskOnboarding from "@metamask/onboarding";
import CardInput from "./CardInput";

const Login = () => {
  const [logged, setLogged] = useState(false);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState();
  const forwarderOrigin = "http://localhost:3000";
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  const { utils } = require("ethers");
  const handleLogin = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          console.log(result);
          setLogged(true);
          setAccount(result[0]);
        })
        .catch((error) => {
          console.log(error);
          console.log("Could not detect Account");
        });
    } else {
      console.log("Need to install MetaMask");
      onboarding.startOnboarding();
    }
  };
  const hnadleLogout = () => {
    setLogged(false);
    setAccount(null);
  };
  // console.log(account);

  return (
    <>
      {!logged ? (
        <div className=" h-screen w-screen flex justify-center items-center  bg-gradient-to-r from-purple-300 to-blue-300">
          <div className=" h-[60vh] w-[40vw] bg-white bg-opacity-60 flex-col gap-8 rounded-xl border border-gray-100 flex items-center justify-center">
            <div className=" text-2xl font-bold text-purple-900">
              Login with metamask
            </div>
            <button
              className=" bg-purple-900 p-3 text-white w-1/3 rounded-xl font-semibold text-xl "
              onClick={handleLogin}
            >
              Log In
            </button>
            <button
              className=" bg-purple-900 p-3 text-white w-1/3 rounded-xl font-semibold text-xl "
              onClick={hnadleLogout}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen App bg-gradient-to-r from-purple-300 to-blue-300 overflow-y-scroll">
          <div className=" flex w-full justify-end px-16 pt-5 ">
            <button
              onClick={hnadleLogout}
              className="bg-purple-900 p-2 text-white  rounded-xl   "
            >
              Log Out
            </button>
          </div>
          <h1>Logged from {account}</h1>
          <CardInput />
          <br></br>
          <br></br>
        </div>
      )}
    </>
  );
};

export default Login;
