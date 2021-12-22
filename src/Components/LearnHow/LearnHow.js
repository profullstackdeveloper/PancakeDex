import React from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import image from "../../images/image.svg";
const Wrapper = styled.div`
  background: #f1f6fb;
  .main {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  .main2 {
    display: none;
  }
  @media only screen and (max-width: 520px) {
    .main {
      display: none;
    }
    .main2 {
      display: grid;
    }
  }
`;
const LearnHow = ({ collapsed }) => {
  const images = [image, image, image, image, image];
  return (
    <Wrapper>
      <Col xs={12} className="mx-auto">
        <div className="main">
          {images.map((el, i) => (
            <div className="my-2 py-2 mx-2 ">
              <img src={el} alt="#" className="w-100 " />
            </div>
          ))}
        </div>
        <div className="main2">
          {images.slice(0, 1).map((el, i) => (
            <div className="my-2 py-2 mx-2 ">
              <img src={el} alt="#" className="w-100 " />
            </div>
          ))}
        </div>
      </Col>
    </Wrapper>
  );
};
export default LearnHow;
