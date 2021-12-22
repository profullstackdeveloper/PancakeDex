import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

import { Button } from "react-bootstrap";

import InputItem from "./InputItem";

const Wrapper = styled.div`
  background: #f1f5fb;
  font-family: "Open Sans";
  height: auto;
 

  .main {
    background: #ffffff;
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

    display: flex;
    align-items: center;
    text-align: center;

    color: #3d3d3d;
  }
  .warning {
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 14px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #ff6262;
  }
  .top-warning {
    display: inline-block;
    padding-top: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    display: flex;
    align-items: center;
    text-align: center;

    color: #ff5858;
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
    position: relative;
    color: #3d3d3d;
  }

  .input {
    border: 0;
    outline: 0;
    font-size: 14px;
    padding: 10px 8px;
    background: #f1f5fb;
    color: #3d3d3d;
  }
  input {
    font-size: 14px;
  }

  input::placeholder {
    color: #3d3d3d;
    opacity: 1;
  }
  .button {
    font-family: "Open Sans", sans-serif;
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
    margin-bottom: 25px;
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
  .header {
    padding: 30px 0;
  }

  @media only screen and (max-width: 767px) {
    .tagline {
      font-size: 14px;
    }

    .name {
      font-size: 13px;
    }
    .input {
      font-size: 12px;
    }
    .button {
      font-size: 12px;
      padding: 0px;
      width: 120px;
    }
  }
`;

const CreatePresale = () => {
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };

  const createLauncPadArray = [
    {
      icon: <BiUserCircle />,
      name: "Token Address",
      placeholeder: "Enter contact address",
      col: 12,
    },
    {
      name: "Soft Cap",
      placeholeder: "Example 50 BNB",
    },
    {
      name: "Hard Cap",
      placeholeder: "Example 100 BNB",
    },
    {
      name: "Liquidity %",
      placeholeder: "01/01/22",
      warning: "Minimum 50%",
      select: ["50%", "60%", "70%", "80%", "90%", "100%"],
      initialValue: "70%",
    },
    {
      name: "Enable Whitelist",
      select: ["Yes", "No"],
      initialValue: "Yes",
    },
    {
      name: "Listing Rate",
      placeholeder: "Example 50 BNB",
    },
    {
      name: "Presale Rate",
      placeholeder: "Example 100 BNB",
    },
    {
      name: "Minimum Contribution",
      placeholeder: "0.1",
    },
    {
      name: "Maximum Contribution",
      placeholeder: "2",
    },
    {
      name: "Presale Start date",
      type: "date",
    },
    {
      name: "Presale End date",
      type: "date",
    },
    {
      name: "Liquity Lock Time",
      select: ["01/06/2022", "01/07/2022", "01/08/2022"],
      initialValue: "01/05/2022",
      warning: "Minimum 3 Months",
      col: 12,
    },
  ];
  return (
    <Wrapper className="py-4">
      <Col xs={12} className="mx-auto main ">
        <Col xs={10} md={9} lg={8} xl={7} xxl={5} className="mx-auto ">
          <div className="d-flex justify-content-center align-items-center flex-column text-center header">
            <img src="./images/pascale.svg" alt="pascale" />
            <h5 className="title py-2">Create Presale</h5>

            <span className="tagline py-0">
              Lock tokens in a instant. Simply fill out the below form
            </span>
            <span className="tagline  top-warning">
              You must have the ability to whitelist ( exclude Formfee) multiple
              addresses or turn off special transfersIf any burn, revbase or
              other special transfers are to take place
            </span>
          </div>
          <Row>
            {createLauncPadArray.map((el, i) => (
              <InputItem {...el} />
            ))}
          </Row>

          <NavLink to="createnow">
            {" "}
            <Button className="button  w-100" onClick={setActive}>
              Next
            </Button>
          </NavLink>
        </Col>
      </Col>
    </Wrapper>
  );
};
export default CreatePresale;
