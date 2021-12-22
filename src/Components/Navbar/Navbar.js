import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import axios from 'axios'
import { BiSearch } from "react-icons/bi";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {atom, selector, useRecoilState} from 'recoil';
import {fetchTokenPrice, getTokenInfo} from '../DifiChange/api/helpers'
import MySelect from "../Select/Select";
import network from "../../images/network.svg";
import metamask from "../../images/metamask.svg";
// import { SearchTokenState, TokenInfoState } from "../../state/defiState";
import AddressInput from "../UI/AddressInput";
import { Typography, Divider } from 'antd';

import {DefiContext} from '../../state/defiState';

const { Title, Paragraph, Text, Link } = Typography;

const Wrapper = styled.div`
  height: 60px;
  
  background: rgba(1, 88, 211, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 35px;
  box-shadow: 0 0 2px 0px #838383;
  border-bottom:.2px solid rgba(0,0,0,.05);
  .input-container {
    align-items: center;
    padding: 0 14px;
    border-radius: 30px;
    background: #fff;
    width: 320px;
    border: 0.03px solid rgba(131, 131, 131, 0.2);
  }
  .input-container input {
    font-family: "Open Sans", sans-serif 
    border-radius: 30px;
    padding: 7px 0;
    border: 0;
    outline: 0;
    width: 100%;
    font-size: 15px;
    padding-left: 15px;
    color: #8b8b8b;
  }
  .search {
    cursor: pointer;
    font-size: 20px;
    color: #8190a6;
  }

  .select-container {
    display: flex;
  }
  .logo {
    display: none;
  }
  @media only screen and (max-width: 1199px) {
    .input-container {
      width: 180px;
    }
    .input-container input {
      padding: 8px 0;
    }
    padding: 0 15px;
  }

  @media only screen and (max-width: 991px) {
    justify-content: flex-end;
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      display: none;
    }
    .input-container {
      display: none;
    }
  }
  .options {
    position: absolute;
  }
  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
  @media only screen and (max-width: 614px) {
    justify-content: flex-end;
  }
  @media only screen and (max-width: 520px) {
    padding: 0;
    .logo {
      width: 60px;
      height: 60px;
      display: none;
    }
  }
`;


const searchEndpoint = "https://api.thegraph.com/subgraphs/name/pancakeswap/pairs";
const poocoinSearch = 'https://api1.poocoin.app/tokens?search=';


var isLoading = false;
const Navbar = ({ collapsed }) => {
  const {
    tokenInfoState,
    setTokenInfoState,
    searchTokenState,
    setSearchTokenState
  } = useContext(DefiContext);

  const { token } = useMoralisWeb3Api();
  const[seachData, setSearchData] = useState([]);

  // const [searchText, setsearchText] = useRecoilState(searchTokenState);
  // const [TokenInfo, setTokenInfo] = useRecoilState(tokenInfoState);
  

  const searchToken = async() => {

    console.log("SEARCHING TOKENNJDNJ")

    if(searchTokenState.length > 1) {
      let body =  { 
        query: `
          {
            tokenSearch(text: "${searchTokenState}", first: 5){
              name,
              id, 
              symbol,
              decimals
            }
          }
        `, 
        variables: {}
      }
      let options = {
        headers: {
            'Content-Type': 'application/json'
        }
      }
      var response = await axios.post(searchEndpoint,body, options);

      if(response.status === 200){
        console.log(response.data.data.tokenSearch);
        setSearchData(response.data.data.tokenSearch)        
      }
      else{
        setSearchData([])
      }
    }
    else{
      var info = await getTokenInfo(tokenInfoState.address);
      console.log("get token information is : ", info);
    }
  }
  

  useEffect(() => {
    searchToken();
  }, [searchTokenState])

  const searchValue = (val) => {
    setSearchTokenState(val);
    searchToken();
  };

  const selectValue = async (item) => {
    console.log("SEARCH VALUE");
    if(isLoading == false){
      isLoading = true;
      setSearchData([]);

      token.getTokenPrice({ chain: 'bsc', address: item.id }).then(async price => {
        console.log( "PRICE GOT" , price);
        
        var info = await getTokenInfo(item.id);
        
        
        setTokenInfoState({
          price: price.usdPrice,
          id: item.id,
          decimals: item.decimals,
          symbol: info.data.ethereum.transfers[0].currency.symbol,
          mint: parseFloat(info.data.ethereum.transfers[0].minted),
          burn: parseFloat(info.data.ethereum.transfers[0].burned),
          name: info.data.ethereum.transfers[0].currency.name
        });

        console.log("gjgg",info);

      });
      
      isLoading = false;
    }
  };


  const networkSelect = ["First Sample", "Second Sample"];

  const wallet = [
    {
      name: "Metamask",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/640px-MetaMask_Fox.svg.png"
    },
    {
      name: "Trust Wallet",
      logo: "https://play-lh.googleusercontent.com/-3uTwEsZDk2NEgRblDEfIIY7T-xAZfJPN5JzVKz7s94Ds8KrKCrSVHvkEuneJlUBekc"
    },
    {
      name: "Wallet Connect",
      logo: "https://avatars.githubusercontent.com/u/37784886?s=280&v=4"
    }

  ]

  const wallets = ["MetaMask", "Trust Wallet" , "Wallet Connect"];
  


  return (
    <>
      <Wrapper className="d-none d-lg-flex">
        {collapsed && <img src="./images/logo.svg" alt="" className="logo" />}
        
        <div className=" flex absolute">
          <div className="input-container h-auto ">
              
            <div className="flex-row">

            {/* <BiSearch className="search" /> */}
            {/* <input type="text" className="w-auto" onChange={searchValue} placeholder="Search token" /> */}
            
            <AddressInput style={{border: "none", padding: "2px", backgroundColor: "white", }} placeholder="Search Token or Paste Address" onfocusout={() => {console.log("djnfj")}} className="rounded-lg" onChange={(val) => {searchValue(val)}} />
            </div>
            
            <div style={{width: "300px"}} className="options bg-white px-2 rounded-lg mt-1" >
              
              {seachData.length != 0 && seachData.map(item => {
                
                return (<div key={item.address} onClick={() => selectValue(item)} className="flex-col w-auto py-1">
                      <div className="" style={{display: "flex", fontSize: "14.5px"}}  >
                      
                        {/* <div className="" style={{flexGrow: "1"}}>{item.name}</div> */}
                        <Title className="" style={{flexGrow: "1", fontSize: "14px"}}>{item.name}</Title>
                        
                        <Text className="" style={{fontSize: "12.5px", marginRight: "1%"}}>{item.symbol}</Text>
                        
                        
                      </div>
                      <Text style={{fontSize: "10.5px"}} >{item.id}</Text>
                      <hr className="my-0 py-0" />
                      
                   </div>)
              })}
            </div>
            
            
          </div>

        </div>
        <div className="select-container">
          {" "}
          <MySelect
            selectArray={networkSelect}
            initialValue="Switch Network"
            image={network}
          />
          <MySelect selectArray={wallet} image={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/640px-MetaMask_Fox.svg.png"} />
        </div>
      </Wrapper>
      <Wrapper
        className="d-lg-none"
        style={{ justifyContent: !collapsed && "flex-end" }}
      >
        {collapsed && <img src="./images/logo.svg" alt="" className="logo" />}
       
        <div className="input-container">
          <input type="text" placeholder="Search token" />
          <BiSearch className="search" />
        </div>
        <div className="select-container">
          {" "}
          <MySelect
            selectArray={networkSelect}
            initialValue="Switch Network"
            image={network}
          />
          <MySelect selectArray={wallets} image="./images/metamask.svg" />
        </div>
      </Wrapper>
    </>
  );
};
export default Navbar;
