import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
const Wrapper = styled.div`
background:#F1F5FB;
  font-family: "Open Sans";
  .main{
    
background: #FFFFFF;
border-radius: 11px;
  }
  .title {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #002861;
  }
  .tagline {
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 25px;

    display: flex;
    align-items: center;
    text-align: center;

    color: #3d3d3d;
  }
  .name {
    margin: 0;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    display: flex;
    align-items: center;

    /* 7 */

    color: #002861;
  }
  .input-container {
    margin: 8px 0;
    background: #f1f5fb;

    border: 1px solid #c4d7f0;
    box-sizing: border-box;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    font-size: 14px;
  }

  .input {
    border: 0;
    outline: 0;
    font-size: 14px;
    padding: 10px 8px;
    background: #f1f5fb;
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
    margin-bottom:25px;
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
  .header{
    padding:30px 0;
  }
  @media only screen and (max-width: 767px) {
    .tagline {
      font-size:14px;
    }

.name{
  font-size:13px;

}
.input{
  font-size:12px;
}
.button{
  font-size:12px;
  padding:0px;
  width:120px;

}
  }
`;

const Token = () => {
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };
  const createLauncPadArray = [
    { name: "Token Address", placeholeder: "Enter contact address" },
    {
      name: "Enter amount of tokens to lock",
      placeholeder: "1000000",
    },
    { name: "Unlock Date", placeholeder: "01/01/22" },
    {
      icon: <BiUserCircle />,
      name: "Logo Link",
      placeholeder: "Logolink.png/jpg",
    },
  ];
  return (
    <Wrapper className="py-4">
      <Col xs={11} className="mx-auto main ">
        <Col xs={10} md={8} lg={7} xl={6} xxl={5} className="mx-auto ">
          <div className="d-flex justify-content-center align-items-center flex-column text-center header">
            <img src="./images/lock.svg" alt="lock" />
            <h5 className="title py-2">Lock Tokens</h5>

            <span className="tagline py-0">
              Lock tokens in a instant. Simply fill out the below form
            </span>
          </div>
          {createLauncPadArray.map((el, i) => (
            <div key={i} className="py-2">
              <p className="name ">{el.name}</p>
              <div className="input-container">
                {el.icon && <BiUserCircle size="18px" color="#3D3D3D" />}
                <input className="input w-100" placeholder={el.placeholeder} />
              </div>
            </div>
          ))}
          <div className="d-flex">
            <Button className="button active" onClick={setActive}>
              Approve
            </Button>
            <Button className="button" onClick={setActive}>
              Submit
            </Button>
          </div>
        </Col>
      </Col>
    </Wrapper>
  );
};
export default Token;
