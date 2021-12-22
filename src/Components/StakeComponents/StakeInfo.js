import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
const Wrapper = styled.div`
  marign: 15px 0;
  font-family: "Open Sans";
  .stakeInfo {
    background: #fff;
    border-radius: 15px;
  }
  .item {
    background: #f1f5fb;
    border-radius: 15px;
  }
  .title {
    margin: 0;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;

    /* identical to box height */
    display: flex;
    align-items: center;

    /* 7 */
    color: #002861;
  }
  .number {
    font-style: normal;
    font-weight: bold;
    font-size: 48px;
    line-height: 65px;
    display: flex;
    align-items: center;

    /* 2 */
    color: #3d3d3d;
  }
  .stakeInfo {
  }
`;

const StakeInfo = () => {
  const stakeInfo = [
    {
      title: "You Staked",
      number: 0,
    },
    {
      title: "App Balance",
      number: 0,
    },
    {
      title: "Total Distributed BNB",
      number: 0.0,
    },
    {
      title: "Total Stakers",
      number: 0,
    },
    {
      title: "Total Staked",
      number: 0,
    },
    {
      title: "Total Supply",
      number: "100B",
    },
  ];
  return (
    <Wrapper className="my-3">
      <Col xs={11} className="stakeInfo p-3 px-4 mx-auto">
        <Row>
          {stakeInfo.map((el, i) => (
            <Col sm={6} lg={4} key={i} className="px-2 my-2">
              <div className="item p-3">
                <p className="title">{el.title}:</p>
                <h2 className="number">{el.number}</h2>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Wrapper>
  );
};
export default StakeInfo;
