import React from "react";
import styled from "styled-components";
import { Col, Button } from "react-bootstrap";
const Wrapper = styled.div`
  font-family: "Open Sans";
  .appStake {
    background: #fff;
    padding: 35px 10px;
    background: #ffffff;
    /* 1 */

    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 15px;
  }
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
  .tagline {
    margin: 0;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;

    /* identical to box height */
    display: flex;
    align-items: center;
    text-align: center;

    /* 2 */
    color: #3d3d3d;
  }
  .button {
    font-family: "Open Sans";
    box-shadow: 0px 4px 9px rgba(0, 0, 0, 0.02);
    border-radius: 23.5px;
    outline: none;
    border: none;

    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 37px;

    color: #0158d3;
    margin: 0 4px;

    outline: none;
    focus: none;
    padding: 4px 20px;

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
  @media only screen and (max-width: 520px) {
    .button {
      font-size: 12px;
    }
  }
`;

const AppStake = () => {
  return (
    <Wrapper className="">
      <Col
        xs={11}
        className="text-center d-flex justify-content-center align-items-center flex-column appStake  mx-auto"
      >
        <h2 className="title">$Ape Stake</h2>
        <p className="tagline py-3">
          Stake $Ape tokens and recieve BNB rewards on each transaction
        </p>
        <Button className="button active">Learn More About Staking Here</Button>
      </Col>
    </Wrapper>
  );
};
export default AppStake;
