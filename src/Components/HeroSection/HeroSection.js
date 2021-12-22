import React from "react";
import styled from "styled-components";
import { Button, Col } from "react-bootstrap";
const Wrapper = styled.div`
  text-align: center;
  padding: 60px 8px;

  .hero-section {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  }
  .title {
    color: #535353;
    font-family: "Open Sans", sans-serif 
    font-style: normal;
    font-weight: bold;
    font-size: 31px;
    line-height: 42px;

    text-align: center;

    color: #1e1e1e;
  }
  .text {
    font-family: "Open Sans", sans-serif 
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 25px;
    margin: 0;
    /* or 26px */

    text-align: center;

    color: #3d3d3d;
  }
  .button {
    font-family: "Open Sans", sans-serif 
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
  .active {
    background: linear-gradient(180deg, #5e9cf3 0%, #0158d3 100%);
    color: #fff;
    border: none;
  }
  @media only screen and (max-width: 1199px) {
    .title {
      font-size: 45px;
      line-height: 55px;
    }
    .text {
      font-size: 20px;
      line-height: 30px;
      padding: 0 2px;
    }
    .button {
      font-size: 18px;
      line-height: 28px;
      padding: 6px 0px;
    }
  }
  @media only screen and (max-width: 520px) {
    .title {
      font-size: 35px;
      line-height: 40px;
    }
    .text {
      font-size: 15px;
      line-height: 23px;
      padding: 0 2px;
    }
    .button {
      font-size: 15px;
      line-height: 23px;
      padding: 6px 0px;
      width: 100px;
    }
  }
`;

const HomePage = () => {
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };
  return (
    <Wrapper>
      <Col md={11} xxl={8} className="mx-auto hero-section py-4 ">
        <h1 className="title">Welcome to ApeLab</h1>
        <p className="text">ApeLab is a full DeFi multi tool platform</p>
        <p className="text">
          Real time BSC data analysis, Decentralized Launchpad Protocol
        </p>
        <div>
          <Button className="button active" onClick={setActive}>
            Launchpad
          </Button>
          <Button className="button" onClick={setActive}>
            Charts
          </Button>
        </div>
      </Col>
    </Wrapper>
  );
};
export default HomePage;
