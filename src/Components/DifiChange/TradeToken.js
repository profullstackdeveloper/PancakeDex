import React from "react";
import styled from "styled-components";
import { Col, Button } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
const Wrapper = styled.div`
  .wrapper {
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: grid;
    align-items: center;
    justify-content: center;
    grid-template-columns: 0.25fr 1fr 0.5fr;
    background: #ffffff;
    border-radius: 19.5px;
    padding: 5px 10px;

    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
  }

  .main-bnb {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
  .bnb-container {
    background: #f1f5fb;
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 19.5px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    width: 40%;
  }
  .image {
    display: inline-block;
    margin-left: 5px;
  }
  .icon {
    color: #2f88ff;
    font-size: 25px;
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .button {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    width: 110px;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 25px;

    color: #0158d3;
    margin: 0 4px;

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
  .active {
    background: linear-gradient(180deg, #5e9cf3 0%, #0158d3 100%);
    color: #fff;
    border: none;
  }
  .input {
    border: 0;
    outline: 0;
    background: #f1f5fb;
    padding: 5px 0;
    tex-align: right;
    width: 30px;
  }
  @media only screen and (max-width: 991px) {
    .main-bnb {
      border-right: none;
    }
    .button-container {
      justify-content: center;
    }
    .wrapper {
      grid-template-columns: 0.25fr 1fr;
    }
  }
  @media only screen and (max-width: 767px) {
    .main-bnb {
      border-left: none;
    }
    .wrapper {
      grid-template-columns: 1fr;
    }
  }
  @media only screen and (max-width: 520px) {
    .wrapper {
      padding: 5px 2px;
    }
    .button {
      font-size: 15px;
      line-height: 23px;

      width: 100px;
    }
    .bnb {
      font-size: 10px;
    }
    .image {
      width: 20px;
    }
    .icon {
      font-size: 15px;
    }
  }
`;

const TradeToken = () => {
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };
  return (
    <Wrapper>
      <Col sm={11} className="mx-auto">
        <div className="text-center my-2 d-md-none">Trade Tokens</div>
        <div className="wrapper">
          <div className="d-none d-md-flex">Trade Tokens</div>
          <div className="main-bnb px-2">
            <div className="bnb-container">
              <div className="bnb ">
                <img src="./images/bnb.svg" alt="#" className="image" />
                BNB
              </div>
              <input type="text" placeholder="0.0" className="input" />
            </div>
            <BsArrowRight className="icon" />

            <div className="bnb-container ">
              <div className="bnb ">
                <img src="./images/smalllogo.svg" alt="#" className="image " />
                APE
              </div>
              <input type="text" placeholder="0.0" className="input" />
            </div>

            <AiOutlineSetting className="icon mx-1" />
            <FiClock className="icon" />
          </div>
          <div className="button-container d-none d-lg-flex">
            <Button className="button active" onClick={setActive}>
              Approved
            </Button>
            <Button className="button" onClick={setActive}>
              Swap
            </Button>
          </div>
        </div>
        <div className="button-container d-flex d-lg-none my-2">
          <Button className="button active" onClick={setActive}>
            Approved
          </Button>
          <Button className="button" onClick={setActive}>
            Swap
          </Button>
        </div>
      </Col>
    </Wrapper>
  );
};
export default TradeToken;
