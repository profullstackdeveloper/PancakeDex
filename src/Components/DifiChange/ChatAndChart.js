import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import ScrollToBottom from "react-scroll-to-bottom";
import { widget } from '../../charting_library'

import Datafeed from './api/'
import { useRecoilState, useRecoilValue } from "recoil";
// import { BUSDStatePrice } from "../../state/defiState";
import { getBUSDPrice } from "../../helpers/BUSDPrice";
import PancakeDex from "./Dex/PancakeDex";
import { setRecoil } from "recoil-nexus";
import axios from 'axios';
import Moment from 'moment';
import { DefiContext } from '../../state/defiState';
import {ApiContext} from './api/index';
import { getExchangeServerTime, getSymbols, getKlines, subscribeKline, unsubscribeKline, checkInterval } from './api/helpers'


const Wrapper = styled.div`
  .button {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 37px;

    color: #0158d3;
    margin: 0 4px;

    outline: none;
    focus: none;
    padding: 3px 15px;

    border: 1px solid #0158d3;
    background: #fff;
    color: #0158d3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    font-family: " Open Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;

    color: #ffffff;
    background: #2f88ff;
    border-radius: 15px 15px 0px 0px;
    padding: 15px 14px;
    margin: 0 -8px;
    margin-top: -8px;
  }
  .button:focus {
    outline: none;
    box-shadow: none;
  }
  .active {
    background: linear-gradient(180deg, #5e9cf3 0%, #0158d3 100%);
    color: #fff;
    border: none;
  }
  .contains {
    background: #ffffff;
    border-radius: 30px;
    height: 480px;
    width: 100%;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }
  .chat-container {
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 15px;
  }
  .chartbody {
    height: 425px;
    overflow-y: scroll;
  }
  .image {
    width: 30px;
  }
  .own {
    background: #2f88ff;
    padding: 15px;
    border-radius: 19.5px 19.5px 2px 19.5px;
    color: #fff;
    font-size: 12px;
  }
  .others {
    background: #f1f5fb;
    border-radius: 19.5px;
    padding: 15px;
    font-size: 12px;
  }
  .message {
    width: 80%;
  }
  .chart-footer {
    width: 100%;
    background: #dcebff;
    border-radius: 9px;
    padding: 8px 8px;
  }
  .chart-footer input {
    width: 90%;

    padding: 12px 12px;
    border: 0;
    outline: 0;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 141%;
    /* identical to box height, or 17px */

    display: flex;
    align-items: center;

    color: #9c9c9c;
  }
  .input-container {
    width: 60%;
    background: #ffffff;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
  }
  .icon-container {
    width: 40%;
  }
  .icon-container img {
    width: 25px;
  }
`;




const ChatandChart = () => {
  const { wholeTokens, setWholeTokens, selectedToken, setSelectedToken, busdStatePrice, setBUSDStatePrice, setTokenInfoState, tokenInfoState, tokenQuoteId, setTokenQuoteId } = useContext(DefiContext)

  // console.log("data feed is : ", dataFeed)
  //const [TokenInfo, setTokenInfo] = useRecoilState(TokenInfoState);
  const [allTokens, setAllTokens] = useState([]);
  // const TokenInfo = useRecoilValue(TokenInfoState);
  // const BUSDPrice = useRecoilValue(BUSDStatePrice);
  
  
  const [widgetOption, setWidgetOption] = useState();
  const [dataFeed, setDataFeed] = useState();
  
  const configurationData = {
		supports_marks: false,
		supports_timescale_marks: false,
		supports_time: true,
		supported_resolutions: ['1', '5', '15', '30', '60', '240', '720', '1D', '1W']
	};

  const intervals = {
    '1': '1m',
    '3': '3m',
    '5': '5m',
    '15': '15m',
    '30': '30m',
    '60': '1h',
    '120': '2h',
    '240': '4h',
    '360': '6h',
    '480': '8h',
    '720': '12h',
    'D': '1d',
    '1D': '1d',
    '3D': '3d',
    'W': '1w',
    '1W': '1w',
    'M': '1M',
    '1M': '1M',
  }

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
      setWholeTokens(response.data.data.ethereum.address[0].balances);
      // console.log("responsen is : ", response.data.data.ethereum.address[0].balances)
    }
  }

  // useEffect(() => {
  //   console.log("whole tokens are : ", wholeTokens)
  //   if(wholeTokens.length > 0)setSelectedToken(wholeTokens[0].currency)
  // }, [wholeTokens])

  useEffect(() => {
    getAllTokens();  
    getPrices();
  },[])

  useEffect(() => {
    // console.log("tokenInfoState is : ", tokenInfoState);
  }, [tokenInfoState])

  useEffect(() => {
    if(busdStatePrice === 0){
      getPrices();
    }
    // console.log("called!", selectedToken)
    // const address = allTokens.length > 0 ? allTokens[0].currency.address : "";
    // const symbol = allTokens.length > 0 ? allTokens[0].currency.symbol : "";
    // const name = allTokens.length > 0 ? allTokens[0].currency.name : "";
    
    
    if(wholeTokens.length > 0){
      // console.log("symbol is : ", allTokens[0].currency.symbol)
      // setSelectedToken({address, symbol, name});
      // console.log("Data feed is : ", Datafeed)
      const tokenList = [];
      wholeTokens.map((token) => {
        tokenList.push(token.currency)
      });
      setAllTokens(tokenList);
    }
  }, [wholeTokens])

  useEffect(() => {
    const index = (tID, setTID, selectedT) => ({
      // get a configuration of your datafeed (e.g. supported resolutions, exchanges and so on)
      onReady: (callback) => {
        setTimeout(() => callback(configurationData)) // callback must be called asynchronously.
      },
      /*
      // NO need if not using search
      searchSymbols: (userInput, exchange, symbolType, onResultReadyCallback) => {
        console.log('[searchSymbols]: Method call');
      },
      */
      // retrieve information about a specific symbol (exchange, price scale, full symbol etc.)
      resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => {
        
        const symbolInfo = (symbol) => ({
          name: symbol.split('-')[0],
          description: symbol.split('-')[0] + ' / ' + symbol.split('-')[1],
          ticker: symbol.split('-')[0],
          exchange: 'PancakeSwap v2',
          //listed_exchange: 'Binance',
          timezone: 'Etc/UTC',
          type: 'crypto',
          session: '24x7',
          minmov: 1,
          pricescale: 1000000000000,
          has_intraday: true,
          intraday_multipliers: ['1', '5', '15', '30', '60', '240', '720'],
          supported_resolutions: configurationData.supported_resolutions,
          data_status: 'streaming',
        })
        console.log("for symbols : ", selectedT)
        var symbols = await getSymbols(selectedT, setTID);
        const symbol = symbols.name;
  
  
  
        return symbol ? onSymbolResolvedCallback(symbolInfo(symbol)) : onResolveErrorCallback('[resolveSymbol]: symbol not found')
  
      },
      // get historical data for the symbol
      // https://github.com/tradingview/charting_library/wiki/JS-Api#getbarssymbolinfo-resolution-periodparams-onhistorycallback-onerrorcallback
      getBars: async (symbolInfo, interval, periodParams, onHistoryCallback, onErrorCallback) => {
  
  
        var QuoteTokenId = tID;
        
        console.log("QUOTE TOKEN ID IS : ", QuoteTokenId)
        if (!checkInterval(interval)) {
          return onErrorCallback('[getBars] Invalid interval')
        }
        
  
  
  
        const klines = await getKlines({ symbol: symbolInfo.name, interval, from: periodParams.from, to: periodParams.to, quote: QuoteTokenId });
        console.log(klines)
        if (klines.length > 0) {
          return onHistoryCallback(klines, { noData: true })
        }
  
        onErrorCallback('Klines data error')
  
      },
      //subscription to real-time updates
      subscribeBars: async (symbolInfo, interval, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
        // console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
  
        // const klines = await getKlines({ symbol: symbolInfo.name, interval })
        // console.log(klines)
        // if (klines.length > 0) {
        // 	return onRealtimeCallback(klines)
        // }
  
        //subscribeKline({ symbol: symbolInfo.name, interval, uniqueID: subscribeUID, }, cb => onRealtimeCallback(cb))
      },
      unsubscribeBars: (subscriberUID) => {
      // console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
      // unsubscribeKline(subscriberUID)
    }})
    const dFeed = index(tokenQuoteId, setTokenQuoteId, selectedToken)
    setDataFeed(dFeed);
  }, [selectedToken, tokenQuoteId])

  useEffect(() => {
    // console.log("selectedToken is : ", selectedToken)

    if(selectedToken && Object.keys(selectedToken).length > 0 && dataFeed) {
      console.log("selected token is : ", selectedToken)
      const defaultProps = {
        symbol: 'BTCUSDT',
        datafeed: dataFeed, // our datafeed object
        interval: '15',
        containerId: 'tv_chart_container',
        //datafeedUrl: 'https://demo_feed.tradingview.com',
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {
          "volume.volume.color.0": "#00FFFF",
          "volume.volume.color.1": "#0000FF",
          "volume.volume.transparency": 70,
          "volume.volume ma.color": "#FF0000",
          "volume.volume ma.transparency": 30,
          "volume.volume ma.linewidth": 5,
          "volume.volume ma.visible": true,
          "bollinger bands.median.color": "#33FF88",
          "bollinger bands.upper.linewidth": 7
        },
      };
      const widgetOptions = {
        debug: false,
        symbol: selectedToken.symbol,
        datafeed: dataFeed,
        interval: defaultProps.interval,
        container: defaultProps.containerId,
        library_path: defaultProps.libraryPath,
        locale: getLanguageFromURL() || 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates', "disable_resolution_rebuild"],
        charts_storage_url: defaultProps.chartsStorageUrl,
        charts_storage_api_version: defaultProps.chartsStorageApiVersion,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        overrides: {
        }
      };
      new widget(widgetOptions);
      // setWidgetOption(widgetOptions);
      // console.log("widget option is : ", widgetOptions.symbol)
    }
  }, [selectedToken, busdStatePrice])


  function getLanguageFromURL() {
    const regex = new RegExp('[\\?&]lang=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  const myRef = React.useRef();

  async function getPrices(){
    var price = await getBUSDPrice();
    // setRecoil(BUSDStatePrice, price);
    console.log("busd price is : ", price)
    setBUSDStatePrice(price);
  }

  const handleSelect = (e) => {
    const token = wholeTokens[e.target.value];
    // console.log(token)
    setSelectedToken(token.currency);
    setTokenInfoState(token.currency);
  }

  const getKlines = async ({ symbol, interval, from, to, quote }) => {
		interval = intervals[interval] // set interval
		
		
		
		// console.log("BUSD PRICE FROM KLINES", BUSDprice)
	
		// console.log("TokenQuoteId", TokenQuoteId)
	
		// console.log('[getKlines]', symbol, interval, from, to)
	
		console.log("QUOTEID", quote);
	
		var fromDate = new Date(from * 1000).toISOString();
		var toDate = new Date(to * 1000).toISOString();
	
		let body =  { 
			query: `
			{
				ethereum(network: bsc) {
				  dexTrades(
					options: {asc: "timeInterval.minute"}
					date: {since: "${fromDate}"}
					exchangeName: {in: ["Pancake" , "Pancake v2"]}
					baseCurrency: {is: "${selectedToken.address || ''}" },
					quoteCurrency: {is: "${quote}"},
					tradeAmountUsd: {gt: 10}
				  ) {
					timeInterval {
					  minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")
					}
					volume: quoteAmount
					high: quotePrice(calculate: maximum)
					low: quotePrice(calculate: minimum)
					open: minimum(of: block, get: quote_price)
					close: maximum(of: block, get: quote_price)
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
		console.log("response for busedPrices are : ", busdStatePrice)
		var resp = [];
	
		if(response.data.data.ethereum.dexTrades) {
			for(var i=0; i<response.data.data.ethereum.dexTrades.length; i++){
			var item = response.data.data.ethereum.dexTrades[i];
	
			var time = item.timeInterval.minute;
			var unixTime = Moment(time).unix()*1000;
			
	
			var resp_item = {
				time: new Date(time).getTime(),
				open: parseFloat(item.open*busdStatePrice),
				close: parseFloat(item.close*busdStatePrice),
				high: parseFloat(Number(item.high)*busdStatePrice),
				low: parseFloat(Number(item.low)*busdStatePrice),
				volume: parseFloat(item.volume*busdStatePrice)
			}
			resp.push(resp_item);
			}
	
		
			resp = resp.map((bar, index, array) => {
				if (index + 1 <= array.length - 1) {
				const nextBar = array[index + 1]
				bar.close = nextBar.open
				}
		
				return bar
			})
		}
		// console.log("ldjnj DATE -- " + response_send[0].time)
		// console.log('[getbitqueryKlinesLENGTH]', response_send.length)
		console.log("response data is : ", resp)
		return resp;
	
	}

  return (
    <Wrapper>
      <Col xs={11} className="mx-auto">
        <Row className="py-4">
          <Col md={8}>
            <div>
              <select name="selectedToken" onChange={(e) => handleSelect(e)}>
                {
                  wholeTokens.map((token, index) => {
                    return (
                      <option value={index} key={token.currency.address}>{token.currency.symbol}</option>
                    )
                  })
                }
              </select>
            </div>
            {/* <button className="button active">
              <BsArrowUp size="25" /> Vote Now <BsArrowDown size="25" />
            </button> */}
            <div ref={myRef} id='tv_chart_container' className="contains"></div>
          </Col>
          <Col md={4}>
            <div className="">
              

              <PancakeDex />
              
            </div>
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default ChatandChart;
