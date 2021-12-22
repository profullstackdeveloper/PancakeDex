import React from "react";
import styled from "styled-components";
import { Button, Row, Col } from "react-bootstrap";
const Wrapper = styled.div`
  font-family: "Open Sans";
  .main {
    background: #fff;
    border-radius: 8px;
  }
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 160%;

    /* identical to box height, or 26px */
    display: flex;
    align-items: center;
    text-align: center;

    /* 7 */
    color: #002861;
  }
  .number {
    margin: 0;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;

    /* identical to box height, or 26px */
    display: flex;
    align-items: center;
    text-align: center;

    /* 2 */
    color: #3d3d3d;
  }
  .left-item {
    height: 100%;
  }
  .item {
    background: #f1f5fb;
    border-radius: 15px;
  }
  .warning {
    margin: 0;

    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 160%;

    /* or 22px */
    display: flex;
    align-items: center;

    color: #ff3434;
  }
  .button {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 37px;

    color: #0158d3;
    margin: 0 4px;

    outline: none;
    focus: none;
    padding: 4px 30px;

    border: 1px solid #0158d3;
    background: #fff;
    color: #0158d3;
  }
  .rewardButton {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 37px;

    color: #0158d3;
    margin: 0 4px;

    outline: none;
    focus: none;
    padding: 4px 30px;

    border: 1px solid #0158d3;
    background: #fff;
    color: #0158d3;
  }
  .button2 {
    padding: 4px 40px;
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
    width: 90%;
    border: 0;
    outline: 0;

    padding: 10px 15px;
    margin: 30px 0;
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.03);
    border-radius: 23.5px;
  }
  @media only screen and (max-width: 520px) {
    .button {
      width: 150px;
      font-size: 12px;
      padding: 4px 4px;
    }
    .input {
      width: 98%;
    }
    .warning {
      font-size: 12px;
    }
  }
`;

const Rewards = ({ collapsed }) => {
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };
  return (
    <Wrapper>
      <Col xs={11} className="main p-3 px-4 mx-auto">
        <Row>
          <Col md={collapsed ? 4 : 12} lg={4} className="px-2 my-2">
            <div className="item left-item py-5 px-2 d-flex justify-content-center align-items-center flex-column ">
              <h3 className="title">Rewards:</h3>
              <p className="number py-2">0.0000000 in BNB</p>
              <Button className="rewardButton active my-3" onClick={setActive}>
                Withdraw
              </Button>
            </div>
          </Col>
          <Col md={collapsed ? 8 : 12} lg={8} className="px-2 text-center my-2">
            <div className="item py-5 px-2 d-flex justify-conten-center align-items-center flex-column">
              <p className="warning">
                There will come 2 Transactions after each other,please wait for
                both to confirm
              </p>
              <input className="  input" />
              <div>
                <Button className="button active my-1" onClick={setActive}>
                  Approved/Stake
                </Button>
                <Button className="button button2 my-1" onClick={setActive}>
                  Unstake
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default Rewards;
