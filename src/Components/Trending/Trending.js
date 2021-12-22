import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
const Wrapper = styled.div`
  padding: 50px 0;
  .section-title {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 33px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #1e1e1e;

    padding-bottom: 18px;
  }
  .logo-container {
    background: #ffd303;
    width: 100%;
    height: 120px;
    border-radius: 8px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .heart {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #3c3c3c;
    position: absolute;
    right: 8px;
    top: 8px;
  }
  .secondLogo {
    width: 80px;
  }

  .my-trending {
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 11px;
    padding: 15px 10px;

    background: #fff;
  }
  .offer {
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #1e1e1e;
    margin: 0;
  }
  .text {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;

    color: #3d3d3d;
    margin: 0;
    padding: 10px 0;
  }
  .read-more {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #0158d3;
  }
  @media only screen and (max-width: 520px) {
    .section-title {
      font-size: 30px;
    }
  }
`;

const Trending = ({ collapsed }) => {
  const trendingArray = [
    {
      offer: "Offer No. 1",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      link: "#",
    },
    {
      offer: "Offer No. 2",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      link: "#",
    },
    {
      offer: "Offer No. 3",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      link: "#",
    },
    {
      offer: "Offer No. 4",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      link: "#",
    },
  ];
  return (
    <Wrapper>
      <Col md={11} className="mx-auto">
        <h3 className="section-title mx-2">Trending Presale’s</h3>
        <Row className="trending m-0">
          {trendingArray.map((el, i) => (
            <Col
              sm={collapsed ? 6 : 12}
              md={collapsed ? 4 : 6}
              lg={collapsed ? 3 : 4}
              xl={3}
              xxl={3}
              key={i}
              className=" my-2 "
            >
              <div className="my-trending ">
                <div className="logo-container ">
                  <div className="  heart">
                    <AiOutlineHeart />
                  </div>
                  <img
                    src="./images/secondlogo.svg"
                    alt="#"
                    className="secondLogo"
                  />
                </div>
                <div className="py-2">
                  <h3 className="offer">{el.offer}</h3>
                  <p className="text">{el.text} </p>
                  <a className="read-more" href={el.link}>
                    ReadMore
                  </a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Wrapper>
  );
};
export default Trending;
