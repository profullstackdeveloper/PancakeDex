import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { Moralis } from 'moralis';

import { FiChevronRight } from "react-icons/fi";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;

  color: #989898;
  .network {
    display: flex;

    align-items: center;
    position: relative;

    padding: 2px 20px;
    height: 40px;
    border-radius: 30px;

    font-size: 13px;
    background: #fff;
    justify-content: space-between;
    font-family: "Open Sans", sans-serif 
  }
  .placeholeder {
    line-height: 15px;
    margin: 0 10px;
    font-family: "Open Sans", sans-serif 
  }
  .options {
    position: absolute;

    top: 60px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border-radius: 8px;
    width: 100%;
    text-align: center;
    right: 4px;
    background: #fff;
  }
  .item {
    padding: 10px;
    border-radius: 8px;
  }
  .item:hover {
    background: rgba(131, 131, 131, 0.8);
    color: #fff;
  }
  .icon {
    font-size: 20px;
    margin-left: 10px;
  }
  .select-image {
    padding-right: 5px;
    width: 24px;
  }
  @media only screen and (max-width: 1199px) {
    .network {
      font-size: 13px;
      padding: 7px 10px;
      height: 45px;
    }
    .select-image {
      width: 24px;
    }
  }
 
  @media only screen and (max-width: 614px) {
    .network {
      display: flex;
justify-content:center;
      align-items: center;
      position: relative;
      border: none;
      padding:0;
      height: 50px;
      width:70px;
    }
    .placeholeder {
      display: none;
    }
    .icon {
      margin-left: 4px;
    }
    .options {
      width: 130px;
    } 
    }
  }
`;

const MySelect = ({ selectArray, initialValue, image }) => {
  const [select, setSelect] = useState(initialValue);
  const [dropdown, setDropdown] = useState(false);
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading, authenticate, user } = useMoralis();

  useEffect(() => {;
    if (!isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      console.log("enable web3");
      Moralis.enableWeb3();
    }
    if(user){
      setSelect(user.get("username"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const authenticateUser = async (walletName) => {

    
    if(walletName === "Metamask" || walletName === "Trust Wallet"){
      authenticate();
    }
    else if(walletName === "Wallet Connect"){
      await authenticate({ provider: "walletconnect" })
    }
    
  }

  return (
    <Wrapper>
      <div className="network" onClick={() => setDropdown((prev) => !prev)}>
        <img src={image} alt="" className="select-image" />
        <div className="text-center placeholeder">
          {select || (
            <>
              <span>Connect</span> <br />
              <span></span>
            </>
          )}
        </div>
        <FiChevronRight
          className="icon"
          style={{
            transform: dropdown && "rotate(90deg)",
            transition: ".3s",
          }}
        />
        {dropdown && (
          <div className="options">
            {selectArray.map((el, i) => (
              <div className="item" key={i} onClick={() => authenticateUser(el.name)}>
                {<>
                  <div className="">
                    <img src={el.logo} alt="" className="select-image" />
                    <span>{el.name}</span>
                  </div>  
                </>}
              </div>
            ))}
          </div>
        )}
      </div>
    </Wrapper>
  );
};
export default MySelect;
