import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Web3 from 'web3';
import PancakeSwapRouterV2 from './PancakeSwapRouterV2.json';
import { PancakeswapPairSettings, PancakeswapPair, PancakeswapPairFactory } from 'simple-pancakeswap-sdk';


export default function PancakeDex () {
    const [allTokens, setAllTokens] = useState([]);
    const [fromToken, setFromToken] = useState({});
    const [toToken, setToToken] = useState({});
    const [fromAmount, setFromAmount] = useState(0);

    const getAllTokens = async () => {
        let body =  { 
          query: `
          {
            ethereum(network: bsc) {
              address(address: {is: "0x1425844319d9a7a375c8f0d05c528948ca2fe3ce"}) {
                balances {
                  currency {
                    symbol
                    address
                    name
                  }
                  value
                }
              }
            }
          }
          `, 
          variables: {}
        }
        let options = {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              'X-API-KEY': "BQYC2JxEOeTNZPWeMTkN5e213z6raCOE"
            }
        }
        var response = await axios.post('https://graphql.bitquery.io',body, options);
        if(response) {
            console.log("result of post", response)
            setAllTokens(response.data.data.ethereum.address[0].balances);
        }
    }

    useEffect(() => {
        getAllTokens();
    }, [])

    const handleSelectFromToken = (e) => {
        const indexNum = e.target.value;
        var token = allTokens[indexNum];
        if(token.currency.symbol == 'BNB') token.currency.address = "0xb8c77482e45f1f44de1745f52c74426c631bdd52";
        console.log("selected from Token is : ", allTokens[indexNum])
        setFromToken(allTokens[indexNum]);
    }
    const handleSelectToToken = (e) => {
        const indexNum = e.target.value;
        var token = allTokens[indexNum];
        if(token.currency.symbol == 'BNB') token.currency.address = "0xb8c77482e45f1f44de1745f52c74426c631bdd52";
        setToToken(allTokens[indexNum]);
    }

    const handleAmount = (e) => {
        setFromAmount(e.target.value);
    }

    async function doSwap() {
        const web3 = new Web3(window.ethereum);
        const PancakeSwapRouterV2Instance = new web3.eth.Contract(PancakeSwapRouterV2.abi, "0x10ed43c718714eb63d5aa57b78b54704e256024e");
        const currentAccount = await web3.eth.getAccounts();
        const currentTime = Date.now();
        const deadline = String(currentTime + (1*60*60*1000));
        const account = currentAccount[0];
        const amount = Number(fromAmount)
        console.log("user select from token is : ", toToken);
        const pancakeSwapPair = new PancakeswapPair({
            fromTokenContractAddress: fromToken.currency.address,
            toTokenContractAddress: toToken.currency.address,
            ethereumAddress: account,
            settings: new PancakeswapPairSettings({
                slippage: slippage/100,
                deadlineMinutes: 20,
                disableMultihops: false
            })
        });
        const pancakeswapPairFactory = await pancakeSwapPair.createFactory();
        const fromToken2 = pancakeswapPairFactory.fromToken;
        const toToken2 = pancakeswapPairFactory.toToken;
        console.log("from token is : ", pancakeswapPairFactory.fromToken, toToken2);
        const customArray = [fromToken2.contractAddress, "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", toToken2.contractAddress]
        PancakeSwapRouterV2Instance.methods.swapExactTokensForTokens(amount, 0, customArray, account, deadline).send({
          from: account,
        }, (err) => {
          console.log("error : ", err)
        })
    }

    const [slippage, setSlippage] = useState(1);
    const handleSlippage = (e) => {
        setSlippage(e.target.value);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", width: "20vw", border: "1px solid #d9d9d9", padding: "20px", borderRadius: "8px"}}>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap"}}>
                <span>Slippage Percent</span>
                <input type="text" style={{outline: "none", borderWidth: '1px', borderRadius: "5px"}} onChange={(e) => handleSlippage(e)} value={slippage}></input>
            </div>
            {
                allTokens.length > 0 
                ? <div>
                    <div  style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "10px", flexWrap: "wrap"}}>
                        <span>From </span>
                        <select onChange={(e) => handleSelectFromToken(e)} style={{outline: "none", borderWidth: '1px', borderRadius: "5px"}}>
                            {
                                allTokens.map((token, index) => {
                                    return (
                                        <option value={index} key={token.currency.symbol+"fromtoken" + index}>{token.currency.symbol}</option>      
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "10px", flexWrap: "wrap"}}>
                        <span>From Amount: </span>
                        <input type="text" value={fromAmount} style={{outline: "none", borderWidth: '1px', borderRadius: "5px"}} onChange={(e) => handleAmount(e)}></input>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "10px", flexWrap: "wrap"}}>
                        <span>To </span>
                        <select style={{outline: "none", borderWidth: '1px', borderRadius: "5px"}} onChange={(e) => handleSelectToToken(e)}>
                            {
                                allTokens.map((token, index) => {
                                    return (
                                        <option value={index} key={token.currency.symbol + "toToken" + index}>{token.currency.symbol}</option>      
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div style={{display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "space-between", marginTop: "10px", flexWrap: "wrap"}}>
                        <span style={{textAlign: "center"}}>To Amount: </span>
                        <input style={{outline: "none", borderWidth: '1px', borderRadius: "5px"}}></input>
                    </div>
                    <button type="button" style={{width: "100%", backgroundColor: "#0758fd", color: "white", marginTop: "20px", height: "40px", borderRadius: "8px", outline: "none", borderWidth: "0px"}} onClick={() => doSwap()}>Swap</button>
                </div> 
                : "Loading"
            }
        </div>
    )
}