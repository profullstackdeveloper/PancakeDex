import { useState, useEffect, useMemo, useContext } from "react";
import { useMoralis } from "react-moralis";
import InchModal from "./Modal";
import useInchDex from "./DexHook";
import { Button, Card, Image, Input, InputNumber, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import { ArrowDownOutlined } from "@ant-design/icons";
import { useTokenPrice } from "react-moralis";
import { tokenValue } from "../../../helpers/formatters";
import { getWrappedNative } from "../../../helpers/networks";
import { useRecoilState } from "recoil";
import { DefiContext } from "../../../state/defiState";


// import { useOneInchQuote } from "react-moralis";

const styles = {
  card: {
    width: "100%",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "500",
  },
  input: {
    padding: "0",
    fontWeight: "500",
    fontSize: "23px",
    display: "block",
    width: "100%",
  },
  priceSwap: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    color: "#434343",
    marginTop: "8px",
    padding: "0 10px",
  },
};

const nativeAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

const chainIds = {
  "0x1": "eth",
  "0x38": "bsc",
  "0x89": "polygon",
};

const getChainIdByName = (chainName) => {
  for (let chainId in chainIds) {
    if (chainIds[chainId] === chainName) return chainId;
  }
};

const IsNative = (address) => address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

function Dex({ chain }) {

  
  const { trySwap, tokenList, getQuote } = useInchDex(chain);

  // const [TokenInfo, setTokenInfo] = useRecoilState(TokenInfoState);
  const {selectedToken} = useContext(DefiContext)

  const { Moralis, isInitialized, chainId, ...rest } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState({
    address: selectedToken.address,
    decimals: selectedToken.decimals,
    symbol: selectedToken.symbol
  });
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});

  const fromTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[fromToken?.["address"]] ? tokenPricesUSD[fromToken?.["address"]] : null),
    [tokenPricesUSD, fromToken]
  );

  const toTokenPriceUsd = useMemo(
    () => (tokenPricesUSD?.[toToken?.["address"]] ? tokenPricesUSD[toToken?.["address"]] : null),
    [tokenPricesUSD, toToken]
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    console.log("fromTokenPriceUsd");
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(10)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    
    if (!toTokenPriceUsd || !quote) return null;
    
    return `~$ ${(Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) * toTokenPriceUsd).toFixed(4)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokenPriceUsd, quote]);

  // tokenPrices
  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    console.log("validatedChain", validatedChain);
    const tokenAddress = IsNative(fromToken["address"]) ? getWrappedNative(validatedChain) : fromToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken["address"]]: price["usdPrice"],
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken["address"]) ? getWrappedNative(validatedChain) : toToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) => {
        
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [toToken["address"]]: price["usdPrice"],
      })},
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    
    setToToken({
      address: selectedToken.address,
      decimals: selectedToken.decimals,
      symbol: selectedToken.symbol
    })
  }, [selectedToken]);

  useEffect(() => {
    if (!tokenList) return null;
    setFromToken(tokenList[nativeAddress]);
  }, [tokenList]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount) return { isActive: false, text: "Enter an amount" };
    if (fromAmount && currentTrade) return { isActive: true, text: "Swap" };
    return { isActive: false, text: "Select tokens" };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount) setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.["address"]]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    console.log(Quote);
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken["decimals"]) / tokenValue(toTokenAmount, toToken["decimals"])
    ).toFixed(6);
    return (
      <Text style={styles.priceSwap}>
        Price:{" "}
        <Text>{`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[[toToken["address"]]].toFixed(
          6
        )})`}</Text>
      </Text>
    );
  };

  return (
    <>
      <Card style={styles.card} bodyStyle={{ padding: "4%" }}>
        <Card style={{ borderRadius: "1rem", marginTop: "4%", marginBottom: "4%" }} bodyStyle={{  padding: "0.9rem" }}>
          <div style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>From</div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <InputNumber
                bordered={false}
                placeholder="0.00"
                style={{ ...styles.input, marginLeft: "-10px" }}
                onChange={setFromAmount}
                value={fromAmount}
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>{fromTokenAmountUsd}</Text>
            </div>
            <Button
              style={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setFromModalActive(true)}
            >
              {fromToken ? (
                <Image
                  src={fromToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <span></span>
              )}
              <span>{fromToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
          <ArrowDownOutlined />
        </div>
        <Card style={{ borderRadius: "1rem", marginTop: "4%", marginBottom: "4%"  }} bodyStyle={{ padding: "0.9rem" }}>
          <div style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>To</div>
          <div
            style={{
              display: "flex",
              flexFlow: "row nowrap",
            }}
          >
            <div>
              <Input
                bordered={false}
                placeholder="0.00"
                style={styles.input}
                readOnly
                value={quote ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(9) : ""}
              />
              <Text style={{ fontWeight: "600", color: "#434343" }}>{toTokenAmountUsd}</Text>
            </div>
            <Button
              style={{
                height: "fit-content",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "0.6rem",
                padding: "5px 10px",
                fontWeight: "500",
                fontSize: "17px",
                gap: "7px",
                border: "none",
              }}
              onClick={() => setToModalActive(true)}
              type={toToken ? "default" : "primary"}
            >
              {toToken ? (
                <Image
                  src={toToken?.logoURI || "https://etherscan.io/images/main/empty-token.png"}
                  alt="nologo"
                  width="30px"
                  preview={false}
                  style={{ borderRadius: "15px" }}
                />
              ) : (
                <span style={{fontSize: "14px"}}  >{selectedToken.symbol}</span>
              )}
              <span>{toToken?.symbol}</span>
              <Arrow />
            </Button>
          </div>
        </Card>
        {quote && (
          <div>
            <Text
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "15px",
                color: "#434343",
                marginTop: "8px",
                padding: "0 10px",
              }}
            >
              Estimated Gas: <Text>{quote?.estimatedGas}</Text>
            </Text>
            <PriceSwap />
          </div>
        )}
        <Button
          type="primary"
          size="large"
          style={{
            width: "100%",
            marginTop: "15px",
            borderRadius: "0.6rem",
            height: "50px",
          }}
          onClick={() => trySwap(currentTrade)}
          disabled={!ButtonState.isActive}
        >
          {ButtonState.text}
        </Button>
      </Card>
      <Modal
        title="Select a token"
        visible={isFromModalActive}
        onCancel={() => setFromModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokenList}
          isSearchable={false}
        />
      </Modal>
      <Modal
        title="Select a token"
        visible={isToModalActive}
        onCancel={() => setToModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isToModalActive}
          onClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokenList}
          isSearchable={true}
        />
      </Modal>
    </>
  );
}

export default Dex;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);


// import React from 'react';
// import Web3 from 'web3';
// import PancakeSwapRouterV2 from './PancakeSwapRouterV2.json';

// export default function Dex () {

//   const params = {
//     estimatedGas: 252364,
//     fromToken: {
//       symbol: 'BNB', 
//       name: 'BNB', 
//       decimals: 18, 
//       address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 
//       logoURI: 'https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png'
//     },
//     fromTokenAmount: "10000000000000000",
//     protocols: [Array(1)],
//     toToken: {
//       address: '0xa72ff2b799324b042ae379809ee54dace99db3a5', 
//       decimals: 9, 
//       symbol: 'MDOGE', 
//       name: 'Miss Doge', 
//       logoURI: 'https://etherscan.io/images/main/empty-token.png'
//     },
//     toTokenAmount: "8336644442417007399"
//   }

//   async function doSwap(params) {
//     const web3 = new Web3(window.ethereum);
//     const PancakeSwapRouterV2Instance = new web3.eth.Contract(PancakeSwapRouterV2.abi, "0x10ED43C718714eb63d5aA57B78B54704E256024E");
//     const currentAccount = await web3.eth.getAccounts();
//     const currentTime = Date.now();
//     const deadline = currentTime + (1*60*60*1000);
//     console.log("web 3 is : ", params);
//     const fromAmount = params.fromTokenAmount/(10 ** 18);
//     const fromTokenAddress = params.fromToken.address;
//     const toTokenAddress = params.toToken.address;
//     const account = currentAccount[0];
//     const customArray = [fromTokenAddress, toTokenAddress]
//     console.log(fromAmount)
//     PancakeSwapRouterV2Instance.methods.swapExactTokensForTokens(fromAmount, 0, customArray, account, deadline).send({
//       from: account
//     }, (err) => {
//       console.log("error : ", err)
//     })
//   }
//   return (
//     <div>
//       <input value="BNB"></input>
//       <span>"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"</span>
//       <input value="MDOGE"></input>
//       <span>"0xa72ff2b799324b042ae379809ee54dace99db3a5"</span> 
//       <button type="button" onClick={() => doSwap(params)}>Swap</button>
//     </div>
//   )
// }