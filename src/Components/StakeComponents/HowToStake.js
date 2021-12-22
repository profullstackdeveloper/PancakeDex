import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
const Wrapper = styled.div`
  font-family: "Open Sans";
  .main {
    background: "";
  }
  .item {
    background: #fff;
    height: 100%;
    border-radius: 15px;
  }
  .title {
    font-family: " Open Sans";
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
  .instructions {
    margin: 0;
    padding-left: 13px;
    padding-top: 2px;

    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 160%;

    /* identical to box height, or 26px */
    display: flex;
    align-items: center;

    /* 2 */
    color: #3d3d3d;
  }
  .icon {
  }
  @media only screen and (max-width: 520px) {
    .instructions {
      font-size: 12px;
    }
  }
`;

const HowToStake = () => {
  const HowToStake = [
    "Connect your wallet",
    "Enter the amount you wish to stake",
    "Remove any comma's or decimals",
    "Click Approve/Stake-2 transactions will come through. Please wait for both",
  ];

  const HowToUnStake = [
    "Connect your wallet",
    "Enter the amount you wish to stake",
    "Remove any comma's or decimals",
    "Click Unstake and confirm transaction",
  ];
  return (
    <Wrapper>
      <Col xs={11} className="main mx-auto  px-1 my-3">
        <Row>
          <Col md={6} className=" px-2 my-2">
            <div className="p-3 py-4 item">
              {" "}
              <p className="title">How To Stake :</p>
              {HowToStake.map((el, i) => (
                <div key={i} className="d-flex py-1">
                  <p className="icon">
                    <BsFillArrowRightCircleFill color="#708CA5" />
                  </p>
                  <p className="instructions">{el}</p>
                </div>
              ))}
            </div>
          </Col>
          <Col md={6} className=" px-2 my-2">
            <div className="p-3 py-4 item">
              <p>How To Unstake :</p>
              {HowToUnStake.map((el, i) => (
                <div key={i} className="d-flex py-1">
                  <p className="icon">
                    <BsFillArrowRightCircleFill color="#708CA5" />
                  </p>
                  <p className="instructions">{el}</p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </Wrapper>
  );
};
export default HowToStake;
