import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { useRecoilState, useRecoilValue} from 'recoil';
import { BUSDStatePrice, TokenInfoState } from "../../state/defiState";

const Wrapper = styled.div`
  overflow-x: hidden;
 className="my-2";
  .token-container {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 19.5px;
  }
  .item {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0px 8px;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    /* 2 */

    color: #3d3d3d;
    height: 50px;
  }
  .liquid {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    gap: 0 10px;
  }
  .liquid-item {
    background: #ffffff;
    border-radius: 19.5px;
    padding: 0px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    /* 2 */

    color: #3d3d3d;
    height: 50px;
  }
  .liquid-image {
    margin-left: 7px;
    width: 14px;
  }
  @media only screen and (max-width: 520px) {
    .liquid-image {
      margin-left: 3px;
      width: 14px;
    }
    .liquid-item {
      border-radius: 15px;
    }
  }
`;

const Token = () => {

  const [TokenInfo, setTokenInfo] = useRecoilState(TokenInfoState);
  // const BUSDPrice = useRecoilValue(BUSDStatePrice);

  const liqudityArray = [
    { title: "Liquidity", img: "./images/liquid.svg" },
    { title: "Liquidity", img: "./images/liquid.svg" },
    { title: "Liquidity", img: "./images/liquid.svg" },
  ];
  return (
    <Wrapper>
      <Col xs={11} className="mx-auto m-0 p-0">
        <Row className="align-items-center">
          <Col md={7} className="my-2">
            <div className="token-container">
              <div className="item">Token Name: {TokenInfo.name}</div>
              <div className="item">Total Supply: {parseFloat(TokenInfo.mint - TokenInfo.burn).toFixed(2)}</div>
              <div className="item" style={{ border: "none" }}>
                Market Cap: ${parseFloat(parseFloat(TokenInfo.mint - TokenInfo.burn)*TokenInfo.price).toFixed(2)}
              </div>
            </div>
          </Col>
          <Col md={5} className="my-2">
            <div className="liquid">
              {liqudityArray.map((el, i) => (
                <div style={{cursor: 'pointer'}} className="liquid-item" onClick={() => {
                  switch(i){
                    case 0:
                        window.open('https://bscscan.com/token/'+TokenInfo.address, '_blank');
                      break;
                    case 1:
                        window.open('https://bscscan.com/token/'+TokenInfo.address+'#code', '_blank');
                      break; 
                    case 2:
                      window.open('https://bscscan.com/token/'+TokenInfo.address+'#balances', '_blank');
                      break;   
                    default:
                      window.open('https://bscscan.com/token/'+TokenInfo.address, '_blank');
                      break;
                      

                  }
                }} key={i}>
                  <span>{el.title}</span>
                  <img src={el.img} alt="" className="liquid-image" />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default Token;
