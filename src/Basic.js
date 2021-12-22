import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
const Wrapper = styled.div``;

const Basic = () => {
  return (
    <Wrapper>
      <Row>
        <Col md={6}></Col>
        <Col md={6}></Col>
      </Row>
    </Wrapper>
  );
};
export default Basic;
