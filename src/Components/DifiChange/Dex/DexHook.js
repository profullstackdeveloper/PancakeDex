import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {pancakeswapPair} from './PancakeHook';
import { BNB } from 'simple-pancakeswap-sdk';
import Web3 from 'web3';
import PancakeSwapRouterV2 from './PancakeSwapRouterV2.json';
import {BigNumber} from 'ethers';

const useInchDex = (chain) => {
const { Moralis, account } = useMoralis();
const [tokenList, setTokenlist] = useState();
var pancakeswapPairFactory;

  async function setPancake(){
    //console.log("Creating Factory");
    pancakeswapPairFactory = await pancakeswapPair.createFactory();
    const fromToken = pancakeswapPairFactory.fromToken;
    console.log("pancake swap from token: ", fromToken);
    console.log(BNB.token().contractAddress)
  }

  useEffect(() => {
    setPancake();
  }, []);

  useEffect(() => {
    if (!Moralis?.["Plugins"]?.["oneInch"]) return null;
    Moralis.Plugins.oneInch.getSupportedTokens({ chain }).then((tokens) => setTokenlist(tokens.tokens));
  }, [Moralis.Plugins, chain]);

  const getQuote = async (params) => 

    await Moralis.Plugins.oneInch.quote({
      chain: params.chain, // The blockchain  you want to use (eth/bsc/polygon)
      fromTokenAddress: params.fromToken.address, // The token you want to swap
      toTokenAddress: params.toToken.address, // The token you want to receive
      amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
    });
    

  async function trySwap(params) {
    const { fromToken, fromAmount, chain } = params;
    const amount = Moralis.Units.Token(fromAmount, fromToken.decimals).toString();
    if (fromToken.address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
      Moralis.Plugins.oneInch
        .hasAllowance({
          chain, // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: fromToken.address, // The token you want to swap
          fromAddress: account, // Your wallet address
          amount,
        })
        .then(async (allowance) => {
          console.log(allowance);
          if (!allowance) {
            Moralis.Plugins.oneInch.approve({
              chain, // The blockchain you want to use (eth/bsc/polygon)
              tokenAddress: fromToken.address, // The token you want to swap
              fromAddress: account, // Your wallet address
            });
          }
        })
        .catch((e) => alert(e.message));
    }

    await doSwap(params)
  }

    async function doSwap(params) {
      const web3 = new Web3(window.ethereum);
      const PancakeSwapRouterV2Instance = new web3.eth.Contract(PancakeSwapRouterV2.abi, "0x10ED43C718714eb63d5aA57B78B54704E256024E");
      const currentAccount = await web3.eth.getAccounts();
      const currentTime = Date.now();
      const deadline = currentTime + (1*60*60*1000);
      console.log("web 3 is : ", params);
      const fromAmount = params.fromAmount;
      console.log("from Amount is ", fromAmount);
      const fromTokenAddress = params.fromToken.address;
      const toTokenAddress = params.toToken.address;
      const account = currentAccount[0];
      const customArray = [fromTokenAddress, toTokenAddress]
      console.log(fromAmount)
      PancakeSwapRouterV2Instance.methods.swapExactTokensForTokens(fromAmount, 0, customArray, account, deadline).send({
        from: account,
      }, (err) => {
        console.log("error : ", err)
      })
    }
  
    // const contract = new web3.eth.Contract();
    // console.log(JSON.stringify(params))    
    // console.log(account)    
    // console.log(Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString())    
    // return await Moralis.Plugins.oneInch.swap({
    //   chain: params.chain, // The blockchain you want to use (eth/bsc/polygon)
    //   fromTokenAddress: params.fromToken.address, // The token you want to swap
    //   toTokenAddress: params.toToken.address, // The token you want to receive
    //   amount: Moralis.Units.Token(params.fromAmount, params.fromToken.decimals).toString(),
    //   fromAddress: account, // Your wallet address
    //   slippage: 20,
    // });

  return { getQuote, trySwap, tokenList };
};

export default useInchDex;