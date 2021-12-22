import React from "react";
import styled from "styled-components";
import { Col } from "react-bootstrap";
import { BiUserCircle } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    font-size: 16px;
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
  @media only screen and (max-width: 991px) {
    .name{
      font-size:15px;
    }
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

const CreateNow = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/createpresale");
  };
  const setActive = (e) => {
    const allButton = document.querySelectorAll(".button");

    allButton.forEach((el) => el.classList.remove("active"));
    e.target.classList.add("active");
  };
  const createLauncPadArray = [
    {
      icon: <BiUserCircle />,
      name: "Logo Link ( Must be a https URL and must end with a supported image extension .png, .jpg, .jpeg or .gtif)",

      placeholeder: "Enter contact address",
      warning:
        "You can use a website like httploremipsum is upload your image then copy the dress herein the same, You can use",
    },
    {
      name: "Website Link:",
      placeholeder: "http://kanbvnsbns.vom",
    },
    { name: "Github Link:", placeholeder: "http://kanbvnsbns.vom" },
    {
      name: "Twitter Link:",
      placeholeder: "http://kanbvnsbns.vom",
    },
    {
      name: "Rapid Link:",
      placeholeder: "http://kanbvnsbns.vom",
    },
    {
      name: "Telegram Link",
      placeholeder: "http://kanbvnsbns.vom",
    },
    {
      name: "Project Description",
      placeholeder:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dumm",
    },
    {
      name: "Any update you want to provide To Participants",
      placeholeder: "Join us twitter for special a drop giveaway",
    },
  ];
  return (
    <Wrapper className="py-4">
      <Col xs={11} className="mx-auto main ">
        <Col xs={11} md={10} lg={9} xl={7} xxl={6} className="mx-auto">
          {" "}
          <div className="d-flex justify-content-center align-items-center flex-column text-center header">
            <span className="tagline py-0">
              Please fill out the additional information below to display it on
              your presale. (Information in this section is optional but a
              description and logo link is recommended
            </span>
          </div>
        </Col>
        <Col xs={10} md={9} lg={8} xl={7} xxl={5} className="mx-auto ">
          {createLauncPadArray.map((el, i) => (
            <div key={i} className="py-2">
              <p className="name ">{el.name}</p>
              <div className="input-container">
                {el.icon && <BiUserCircle size="18px" color="#3D3D3D" />}
                <input className="input w-100" placeholder={el.placeholeder} />
              </div>
              <p className="warning m-0">{el.warning}</p>
            </div>
          ))}
          <div className="d-flex">
            <Button
              className="button active"
              onClick={(e) => {
                goBack();
                setActive(e);
              }}
            >
              Back
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
export default CreateNow;
