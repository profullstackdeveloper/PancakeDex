import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
import bigDecimal from 'js-big-decimal';

import { StreamingFast, getTransactions } from './api/helpers'
import { useRecoilValue, useRecoilState } from "recoil";
import { BUSDStatePrice, TokenInfoState, TokenQuoteId } from "../../state/defiState";
import { getRecoil } from "recoil-nexus";

const Wrapper = styled.div`
  .tokenAndPrice {
    border-radius: 15px;

    font-family: "Open Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    background:#fff;
  }
  .topAndtokens{
    background:#fff;
    border-radius: 15px;
  }
  /* identical to box height, or 20px */

  p {
    margin: 0 !important;
  }
  .contains {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 2fr 1fr 1fr;
    padding: 10px 5px;
    border-radius: 8px;
  }
  .titleContains {
    background: #2f88ff;
    border-radius: 15px 15px 0px 0px;
    color: #fff;
    padding: 14px 0px;
    margin:0 -8px;
  }
  .name {
    padding: 0 5px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 14px;
  }
  .t-title {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    padding: 14px 15px;
    color: #ffffff;
    background: #2f88ff;
    border-radius: 15px 15px 0px 0px;
  
  }
  .external-toptockens {
    background: #ebf3ff;
  }
  .toptokens {
    width: 100%;
    display: grid;
    grid-template-columns: .8fr 0.5fr 0.5fr;
    padding: 0px 8px;
  }
  .topContains {
    padding: 12px 8px;
    border-right: 1px solid rgba(1, 88, 211, 0.11);
    border-bottom: 1px solid rgba(1, 88, 211, 0.11);
  }
  .top {
    font-family: Open Sans;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 16px;
display: flex;
align-items: center;

/* 2 */

color: #3D3D3D

    /* 2 */

    color: #3d3d3d;
  }
  .top2 {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #969393;
  }
  @media only screen and (max-width: 520px) {
    .name {
      padding: 0 5px;

      font-size: 12px;
    }
  }
`;

const TokenPrice = () => {
  const [TokenInfo, setTokenInfo] = useRecoilState(TokenInfoState);
  const [TokenTrans, setTokenTrans] = useState([])
  const BUSDprice = useRecoilValue(BUSDStatePrice);

  var TokenQuoteID;
  

  const tokenPrice = [
    {
      name: "Buy",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
    {
      name: "Sell",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
    {
      name: "Buy",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
    {
      name: "Buy",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
    {
      name: "Buy",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
    {
      name: "Buy",
      token: "1,000,000,000",
      tokenUnit: "MZ",
      price: "$0.02",
      price2: "0.0000 BNB",
      priceToken: "$0.0000000",
      priceToken2: "Pc v2",
    },
  ];

  const topTokens = [
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
    {
      tokens: "MZ $0.00000",
      tokensName: "Metazilla",
      balance: "0.00",
      balance2: "$0.00",
    },
  ];

  async function getTrans(){
    //var trans = await getTransactions(TokenInfo.id);
    var trans = await StreamingFast.getTrasactions(TokenInfo.address, TokenQuoteID, 5);

    if(trans != null && trans != undefined){
      var swaps = trans.data.data.swaps;
      console.log(swaps);
      setTokenTrans(swaps);
    }

  }

  useEffect(() => {
    setInterval(()=>{
      TokenQuoteID = getRecoil(TokenQuoteId);
      getTrans();
    }, 5000)

  }, [])

  
  return (
    <Wrapper>
      <Col xs={11} className="mx-auto py-2">
        <Row>
          <Col md={7} className="px-3">
            <div className="tokenAndPrice px-2">
              <div className="contains titleContains">
                <p className="name"></p>

                <p className="name">Token</p>

                <p className="name">Price</p>

                <p className="name">Price/Token</p>
              </div>
              {TokenTrans.length> 0 &&

                  TokenTrans.map((el, i) => (
                    <div
                      className="contains"
                      style={{ background: i % 2 === 1 && "#E8F2FF" }}
                    >
                      <p
                        className="name"
                        style={{ color: el.amount0Out > 0  ? "#FF574D" : "#239419" }}
                      >
                        {el.amount0In > 0  ? "Buy" : "Sell"}
                      </p>
                      <div>
                        <p className="name">{el.amount0In > 0 ? parseFloat(el.amount0In).toFixed(3) : parseFloat(el.amount0Out).toFixed(3)}</p>
                        <p className="name">{el.token0.symbol}</p>
                      </div>
                      <div>
                        <p className="name">{ "$ " +bigDecimal.round(el.amountUSD, 2) }</p>
                        <p className="name">{el.amount1In > 0 ? bigDecimal.round(el.amount1In, 5) + " " + el.token1.symbol : bigDecimal.round(el.amount1Out, 5) + " " + el.token1.symbol }</p>
                      </div>
                      <div>
                        <p className="name"> ${ el.amount0In > 0 ? bigDecimal.round((el.amountUSD/el.amount0In), 10) : bigDecimal.round((el.amountUSD/el.amount0Out), 10) }</p>
                        <p className="name">{el.priceToken2}</p>
                      </div>
                    </div>
                  ))
              
              }

             
            </div>
          </Col>
          <Col md={5} className="px-3">
            {" "}
            <div className="topAndtokens">
              <span className="t-title">Top Tockens</span>
              <div className="toptokens external-toptockens my-2 py-2">
                <p className="top px-2"> Tokens</p>

                <p className="top">Balance</p>

                <div className="d-flex  align-items-center"></div>
              </div>
              {topTokens.map((el, i) => (
                <div className="toptokens">
                  <div className="topContains">
                    <p className="top">{el.tokens}</p>
                    <p className="top2">{el.tokensName}</p>
                  </div>
                  <div className="topContains px-4">
                    <p className="top">{el.balance}</p>
                    <p className="top2">{el.balance2}</p>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center topContains px-4"
                    style={{ borderRight: "none" }}
                  >
                    <AiOutlineStar color="#FFD303" size="18px" />
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default TokenPrice;
