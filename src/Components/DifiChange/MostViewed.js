import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
const Wrapper = styled.div`
  display: grid;

  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  border-radius: 19.5px;

  gap: 5px 0px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    font-family: "Open Sans";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    background: #ffffff;
    height: 50px;
  }
  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const MostViewed = () => {
  const mostViewedArray = [
    {
      title: "Most Viewed",
      icon: "./images/mostviewed.svg",
    },
    {
      title: "#1 APE",
      icon: "./images/2.svg",
    },
    {
      title: "#2 APE",
      icon: "./images/3.svg",
    },
    {
      title: "#3 APE",
      icon: "./images/4.svg",
    },
    {
      title: "#4 APE",
      icon: "./images/5.svg",
    },
    {
      title: "#5 APE",
      icon: "./images/6.svg",
    },
    {
      title: "#6 APE",
      icon: "./images/7.svg",
    },
    {
      title: "#7 APE",
      icon: "./images/8.svg",
    },
    {
      title: "#8 APE",
      icon: "./images/9.svg",
    },
  ];
  return (
    <Col xs={11} className="mx-auto ">
      <Wrapper>
        {mostViewedArray.map((el, i) => (
          <div
            className="item"
            key={i}
            style={{
              borderRadius:
                i === 8
                  ? " 0px 19.5px 19.5px 0px"
                  : i === 0 && " 19.5px 0px 0px 19.5px",
              borderRight: i === 0 && "1px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>{el.title}</span>
            <img
              src={el.icon}
              alt="#"
              style={{ marginLeft: i === 0 && "3px" }}
            />
          </div>
        ))}
      </Wrapper>
    </Col>
  );
};
export default MostViewed;
