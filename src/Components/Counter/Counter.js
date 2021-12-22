import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

import CountUp from "react-countup";
const Wrapper = styled.div`
  width: 100%;
  .my-card-container {
  }
  .my-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    padding: 15px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    text-align: center;
    border-radius: 8px;
    background: #fff;
  }
  .number {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    font-family: "Open Sans", sans-serif 

    /* identical to box height */

    color: #2f88ff;
  }
  .tagline {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    font-family: "Open Sans", sans-serif 

    color: #3d3d3d;
  }
  @media only screen and (max-width: 1199px) {
    .number {
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 47px;

      /* identical to box height */

      color: #838383;
    }
    .tagline {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 27px;

      color: #838383;
    }
  }
`;

const MyCounter = ({ collapsed }) => {
  const counterArray = [
    {
      number: 167.4,
      text: "Total Liquidity Raised",
    },
    {
      number: 1457,
      text: "Total Liquidity Raised",
    },
    {
      number: 123678,
      text: "Total Liquidity Raised",
    },
    {
      number: 138,
      text: "Total Liquidity Raised",
    },
  ];
  return (
    <Wrapper>
      <Col md={11} xxl={8} className="mx-auto">
        <Row className="m-0">
          {counterArray.map((el, i) => (
            <Col
              sm={collapsed ? 6 : 12}
              md={collapsed ? 4 : 6}
              lg={collapsed ? 3 : 4}
              xl={3}
              xxl={3}
              key={i}
              className="my-card-container px-2 my-2"
            >
              <div className="my-card ">
                {" "}
                <h3 className="number">
                  {" "}
                  <CountUp
                    start={1}
                    end={el.number}
                    duration={1}
                    separator={i !== 1 && ","}
                    prefix={i === 0 ? "$" : i === 3 ? "$" : ""}
                    suffix={i === 0 ? "M" : i === 3 ? "M" : ""}
                  />
                </h3>
                <p className="tagline">{el.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Wrapper>
  );
};
export default MyCounter;
