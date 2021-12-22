import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Button } from "react-bootstrap";
import { FiPlus, FiMinus } from "react-icons/fi";
const Wrapper = styled.div`
  background: #f1f6fb;
  padding: 30px 0;

  .title {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: bold;
    font-size: 31px;
    line-height: 42px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #1e1e1e;
  }
  .button {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    width: 130px;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 37px;

    color: #0158d3;
    margin: 0 4px;
    margin-top: 25px;
    outline: none;
    focus: none;
    padding: 3px 0;

    border: 1px solid #0158d3;
    background: #fff;
    color: #0158d3;
  }
  .button:focus {
    outline: none;
    box-shadow: none;
  }
  .bnb {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    padding-left: 8px;
    /* identical to box height */

    color: #3d3d3d;
  }
  .icon {
    background: none;
    font-weight: 500;
  }
  .actives {
    background: linear-gradient(180deg, #5e9cf3 0%, #0158d3 100%);
    color: #fff;
    border: none;
  }
  .mint {
    padding: 0 5px;
  }
  .text {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;
    /* identical to box height, or 26px */

    display: flex;
    align-items: center;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #000000;
  }
  .text1 {
    margin: 0;
  }
  .text3 {
    padding: 15px 0;
  }
  .image-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .activate {
    background: linear-gradient(180deg, #5e9cf3 0%, #0158d3 100%);
    color: #fff;
  }
  @media only screen and (max-width: 350px) {
    .button {
      width: 120px;
    }
  }
`;

const MintPage = () => {
  const [mint, setMint] = useState(1);
  const increase = () => {
    setMint((prev) => prev + 1);
  };
  const decrease = () => {
    if (mint <= 0) return;
    setMint((prev) => prev - 1);
  };
  const setActive = (e) => {
    e.target.classList.toggle("activate");
  };
  return (
    <Wrapper>
      <Col md={11} xxl={8} className="mx-auto">
        <Row className="d-flex justify-content-center align-items-center py-4 py-md-0">
          <Col
            md={6}
            className="d-flex justify-content-center  align-items-center"
          >
            {" "}
            <img src="./images/nft.png" alt="" className="w-100" />
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-center flex-column align-items-center"
          >
            <h1 className="title">
              {" "}
              LabApe NFTS <br /> 5000 to be Minted
            </h1>
            <div className="d-flex flex-column">
              <div>
                <Button className="button actives">
                  <FiPlus size="20px" onClick={increase} className="icon" />
                  <span className="mint"> {mint}</span>
                  <FiMinus size="20px" onClick={decrease} className="icon" />
                </Button>
                <Button className="button" onClick={setActive}>
                  Ape
                </Button>
              </div>
              <span className="bnb">.3 BNB per Lab Ape</span>
            </div>
          </Col>
        </Row>
        <p className="text1 text">
          Deep within the Binance Smart Chain there lies an expensive
          laboratory. Rich scientists built it to run tests on poor apes. But
          the apes didn’t want to be poor anymore, and rose up!{" "}
        </p>
        <p className="text2 text">
          {" "}
          They overthrew the scientists and ran them off. But the scientists
          left in such a hurry, they forgot their credit cards! <br /> Now armed
          with some credit and an online shopping account, they accessorized.
          Everything they ever wanted to buy. Including a large… <br /> pink…
          club? They aren’t sure what it was but it wasn’t their money so who
          cares?
        </p>
        <p className="text text3"> Meet the Ape Lab NFT Gang!</p>
        <p className="text text4">
          Every LabApe Minted 33% of the revenue goes into the $Ape token and
          burned{" "}
        </p>
      </Col>
    </Wrapper>
  );
};
export default MintPage;
