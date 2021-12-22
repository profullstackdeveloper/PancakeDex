import { getExchangeServerTime, getSymbols, getKlines, subscribeKline, unsubscribeKline, checkInterval } from './helpers'
import { getRecoil, setRecoil } from 'recoil-nexus'
import React, {useContext, useEffect, useState} from 'react';
import {DefiContext} from '../../../state/defiState';
import axios from 'axios';
import Moment from 'moment';
// import { TokenQuoteId } from '../../../state/defiState';

export const ApiContext = React.createContext({});

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
export default function ApiProvider ({children}) {
	const configurationData = {
		supports_marks: false,
		supports_timescale_marks: false,
		supports_time: true,
		supported_resolutions: ['1', '5', '15', '30', '60', '240', '720', '1D', '1W']
	};
	const {selectedToken, tokenInfoState, tokenQuoteId, busdStatePrice, setTokenQuoteId} = useContext(DefiContext);
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
	const [dataFeed, setDataFeed] = useState();
	useEffect(() => {
		if(selectedToken.address){
			const dFeed = index(tokenQuoteId, setTokenQuoteId, selectedToken)
			setDataFeed(dFeed);
		}
			
	}, [selectedToken])

	return (
		<ApiContext.Provider
			value={{
				dataFeed,
				setDataFeed
			}}
		>
			{children}
		</ApiContext.Provider>
	)
}
