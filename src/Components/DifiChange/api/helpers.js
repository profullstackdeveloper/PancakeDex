import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios'
import Moment from 'moment';



import {DefiContext} from '../../../state/defiState'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { ConsoleSqlOutlined } from '@ant-design/icons';

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

export const getSymbols = (tokenInfoState, setTokenQuoteId) => getToken(tokenInfoState, setTokenQuoteId).then(res => {
    return res
})

export const getToken = async (tokenInfoState, setTokenQuoteId) => {
    console.log("token Info state is : ", tokenInfoState)
    let pairs = await StreamingFast.getPairs(tokenInfoState.address);
    console.log("pairs is : ", pairs)
    if(pairs != null){
      let pair = pairs[0];
      // setRecoil(tokenQuoteId, pair.quoteId);
      setTokenQuoteId(pair.quoteId)
      return pair;
    }
    else{
        return null;
    }
    
    // let body =  { 
    //     query: `
    //          {
    //             ethereum(network: bsc) {
    //                 address(address: {is: "${TokenInfo.id}"}) {
    //                   smartContract {
    //                   currency {
    //                       symbol
    //                       name
    //                       decimals
    //                       tokenType
    //                     }
    //                   }
    //                 }
    //               }
    //         }
    //     `, 
    //     variables: {}
    // }
    // let options = {
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //       'X-API-KEY': "BQYC2JxEOeTNZPWeMTkN5e213z6raCOE"
    //     }
    // }
    // var response = await axios.post('https://graphql.bitquery.io',body, options);
         
}


export const fetchTokenPrice = async ({tokenAdd, token}) => {
  
  console.log("tokenAddress", tokenAdd);
  return token.getTokenPrice({ chain: 0x38, exchange: "Pancake v2" , address: tokenAdd }).then((result) => result);
};

// https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
// export const getKlines = async ({ symbol, interval, from, to, quote }) => {
// 	interval = intervals[interval] // set interval
//     const TokenInfo = getRecoil(TokenInfoState);
    
//     const BUSDprice = getRecoil(BUSDStatePrice);
//     // console.log("BUSD PRICE FROM KLINES", BUSDprice)

//     // console.log("TokenQuoteId", TokenQuoteId)

//     // console.log('[getKlines]', symbol, interval, from, to)

//     console.log("QUOTEID", quote);

//     var fromDate = new Date(from * 1000).toISOString();
//     var toDate = new Date(to * 1000).toISOString();
    


//     let body =  { 
//         query: `
//         {
//             ethereum(network: bsc) {
//               dexTrades(
//                 options: {asc: "timeInterval.minute"}
//                 date: {since: "${fromDate}"}
//                 exchangeName: {in: ["Pancake" , "Pancake v2"]}
//                 baseCurrency: {is: "${TokenInfo.address}" },
//                 quoteCurrency: {is: "${quote}"},
//                 tradeAmountUsd: {gt: 10}
//               ) {
//                 timeInterval {
//                   minute(count: 15, format: "%Y-%m-%dT%H:%M:%SZ")
//                 }
//                 volume: quoteAmount
//                 high: quotePrice(calculate: maximum)
//                 low: quotePrice(calculate: minimum)
//                 open: minimum(of: block, get: quote_price)
//                 close: maximum(of: block, get: quote_price)
//               }
          
//             }
//           }
//         `, 
//         variables: {}
//     }
//     let options = {
//         headers: {
//           'Access-Control-Allow-Origin': '*',
//           'Content-Type': 'application/json',
//           'X-API-KEY': "BQYC2JxEOeTNZPWeMTkN5e213z6raCOE"
//         }
//     }
//     var response = await axios.post('https://graphql.bitquery.io',body, options);
    
//     var resp = [];

//     for(var i=0; i<response.data.data.ethereum.dexTrades.length; i++){
//         var item = response.data.data.ethereum.dexTrades[i];

//         var time = item.timeInterval.minute;
//         var unixTime = Moment(time).unix()*1000;
        

//         var resp_item = {
//             time: new Date(time).getTime(),
//             open: parseFloat(item.open*BUSDprice),
//             close: parseFloat(item.close*BUSDprice),
//             high: parseFloat(Number(item.high)*BUSDprice),
//             low: parseFloat(Number(item.low)*BUSDprice),
//             volume: parseFloat(item.volume*BUSDprice)
//         }
//         resp.push(resp_item);
//     }

    
//     resp = resp.map((bar, index, array) => {
//         if (index + 1 <= array.length - 1) {
//           const nextBar = array[index + 1]
//           bar.close = nextBar.open
//         }

//         return bar
//       })
//     // console.log("ldjnj DATE -- " + response_send[0].time)
//     // console.log('[getbitqueryKlinesLENGTH]', response_send.length)

//     return resp;

// }

const bitqueryUrl = 'https://graphql.bitquery.io';
const StreamingFastBaseUrl = 'https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2'

export const getTokenInfo = async (token) => {
    //const BUSDprice = getRecoil(BUSDStatePrice);
    console.log("TOKEN INFO", token)

    let body =  { 
        query: `
        {
            ethereum (network:bsc){
              transfers(date: {since: null, till: null}, amount: {gt: 0}) {
                minted: amount(
                  calculate: sum
                  sender: {is: "0x0000000000000000000000000000000000000000"}
                )
                burned: amount(
                  calculate: sum
                  receiver: {is: "0x0000000000000000000000000000000000000000"}
                )
                currency(currency: {is: "${token}"}) {
                  symbol
                  name
                  tokenId
                }
              }
              dexTrades(
                options: {desc: ["block.height","tradeIndex"], limit: 1}
                exchangeName: {in: ["Pancake v2"]}
                baseCurrency: {is: "${token}"}
                quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
                date: {after: "2021-09-15"}
              ) {
                smartContract {
                  address {
                    address
                  }
                  contractType
                  currency {
                    name
                  }
                }
                tradeIndex
                block {
                  height
                }
                quotePrice
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

    if(response.status === 200){
        
        return response.data;
      }
      else{
        var resp = [];
        
        return resp;
      }
}

export const getTransactions = async(token) => {
    console.log("TOKEN", token)
    var res = await axios.post(
        bitqueryUrl, {
        query: ` {
            ethereum(network: bsc) {
              dexTrades(
                options: {desc: "timeInterval.second", limit: 5}
                exchangeName: {is: "Pancake v2"}
                baseCurrency: {is: "${token}"}
                quoteCurrency: {is: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"}
                date: {after: "2021-03-28"}
              ) {
                
                timeInterval {
                  second
                }
                buyAmount
                buyAmountInUsd: buyAmount(in: USD)
                buyCurrency {
                  symbol
                  address
                }
                sellAmount
                sellAmountInUsd: sellAmount(in: USD)
                sellCurrency {
                  symbol
                  address
                }
                sellAmountInUsd: sellAmount(in: USD)
                tradeAmount(in: USD)
                price
              }
            }
          }          
          `,
        variables: {
          
        },
        headers: { 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'X-API-KEY': "BQYC2JxEOeTNZPWeMTkN5e213z6raCOE" }
      });

      if(res.status === 200){
        var resp = [];
        for(var i=0; i<res.data.data.ethereum.dexTrades.length; i++){
            var item = res.data.data.ethereum.dexTrades[i];

            var buyCurrencySymbol = item.buyCurrency.symbol;
            var buyCurrencyAddress = item.buyCurrency.address;

            var sellCurrencySymbol = item.sellCurrency.symbol;
            var sellCurrencyAddress = item.sellCurrency.address;

            if(buyCurrencyAddress == token){
                var resp_item = {
                    time: item.timeInterval.second,
                    type: "sell",
                    buyAmount: parseFloat(item.buyAmount),
                    sellAmount: parseFloat(item.sellAmount),
                    buySymbol: buyCurrencySymbol,
                    sellSymbol: sellCurrencySymbol,
                    tradeAmount: parseFloat(item.tradeAmount),
                    price: parseFloat(item.price)
                }
                resp.push(resp_item);
            }
            else{
                var resp_item = {
                    time: item.timeInterval.second,
                    type: "buy",
                    buyAmount: parseFloat(item.buyAmount),
                    sellAmount: parseFloat(item.sellAmount),
                    buySymbol: buyCurrencySymbol,
                    sellSymbol: sellCurrencySymbol,
                    tradeAmount: parseFloat(item.tradeAmount),
                    price: parseFloat(item.price)
                }
                resp.push(resp_item);
            }

        }
        return resp;
      }
      else{
          return null;
      }

}

export const StreamingFast = {
  getTrasactions: (token0, token1, limit) => axios.post(
    StreamingFastBaseUrl, {
    query: `query ($token0: String, $token1: String, $first: Int) {
        swaps(first: $first,
          orderBy: timestamp,
          orderDirection: desc,
          where: {
            token0: $token0
            token1: $token1
          }) {
          timestamp
          token0 {
            symbol
            id
            name
          }
          token1 {
            symbol
            id
            name
          }
          amount0In
          amount1In
          amount0Out
          amount1Out
          amountUSD
          transaction {
            id
          }
        }
      }
      `,
    variables: {
      token0: token0,
      token1: token1,
      first: limit
    }
  }),
  getPairs: async (token) => {
    console.log("get pairs : ", token)
    var res = await axios.post(
        StreamingFastBaseUrl, {
        query: ` {
            token(id: "${token}") {
              id
              name
              symbol
              decimals
              tradeVolume
              tradeVolumeUSD
              derivedBNB
              derivedUSD
              pairBase(orderBy: reserveUSD, orderDirection: desc, where: {token1_in: ["0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c", "0xe9e7cea3dedca5984780bafc599bd69add087d56", "0x55d398326f99059ff775485246999027b3197955"]}) {
                name
                reserve0
                reserve1
                reserveUSD
                token1Price
                token1 {
                  id
                }
              }
            }
          }
          `,
        variables: {
          
        }
      });
    console.log("response is : ", res)
      if(res.status === 200){
        var resp = [];
        for(var i=0; i<res.data.data.token.pairBase.length; i++){
            var item = res.data.data.token.pairBase[i];
            var resp_item = {
                name: item.name,
                symbol: item.symbol,
                reserve0: item.reserve0,
                reserve1: item.reserve1,
                reserveUSD: item.reserveUSD,
                token1Price: item.token1Price,
                quoteId: item.token1.id
            }
            resp.push(resp_item);
        }
        return resp;
      }
      else{
        return null;
      }

    
  },

  getTotalSupply: (token) => axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${token}&apikey=PB3KKUUMP9A9FVEFVGWZESKUVT6XGVX4JC`)
}


// export const subscribeKline = ({ symbol, interval, uniqueID }, callback) => {
// 	interval = intervals[interval] // set interval
// 	return api.stream.kline({ symbol, interval, uniqueID }, res => {
// 		const candle = formatingKline(res.kline)
// 		callback(candle)
// 	})
// }

// export const unsubscribeKline = (uniqueID) => {
// 	return api.stream.close.kline({ uniqueID })
// }

export const checkInterval = (interval) => !!intervals[interval]

// helpers ------------------------

function formatingKline({ openTime, open, high, low, close, volume }) {
	return {
		time: openTime,
		open,
		high,
		low,
		close,
		volume,
	}
}

function request(url, params = {}) {
	return axios({
		baseURL: 'http://localhost:3000/',
		method: 'get',
		url,
		params
	})
		.then(res => res.data)
		.catch(res => console.log(res))
}

function candle(i) {
	return {
		o: parseFloat(i[1]),
		h: parseFloat(i[2]),
		l: parseFloat(i[3]),
		c: parseFloat(i[4]),
		v: parseFloat(i[5]),
		ts: i[0],
		price: parseFloat(i[4]),
		openTime: i[0],
		closeTime: i[6],
		trades: i[8]
	}
}