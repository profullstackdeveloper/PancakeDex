import React, {useState, useEffect} from "react";
import AddressInput from "../../UI/AddressInput";
import axios from 'axios'

var isSearching = false;
function PancakeModal({ open, onClose, setToken, tokenList, isSearchable }) {

  const [searchValue, setsearchValue] = useState("")
  const [searchTokens, setsearchTokens] = useState([])

  const searchToken = async() => {
    if(searchValue.length > 1 && !isSearching) {
      isSearching = true;
      let body =  { 
          query: `
            {
              tokenSearch(text: "${searchValue}", first: 7){
                name
                id
                symbol
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
    var response = await axios.post("https://api.thegraph.com/subgraphs/name/pancakeswap/pairs",body, options);

      if(response.status === 200){
        console.log(response.data.data.tokenSearch);
        setsearchTokens(response.data.data.tokenSearch)        
      }
      else{
        setsearchTokens([])
      }
      isSearching = false;
    }
    else{
      setsearchTokens([])
    }
  }

  useEffect(() => {
    searchToken();
  }, [searchValue])

  if (!open){
    return null
  } 
  else{
    return (
      <div style={{ overflow: "auto", height: "500px" }}>

        {
          isSearchable ? <AddressInput onChange={(val)=> {setsearchValue(val)}} /> : null
        }
  
        
  
        {searchTokens.length > 0 
          ? Object.keys(searchTokens).map((token, index) => (
            
            <div
                style={{
                  padding: "5px 20px",
                  display: "flex",
                  fontWeight: "600",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
  
                  var setJSON = {
                    address: searchTokens[token].id,
                    name: searchTokens[token].name,
                    symbol: searchTokens[token].symbol,
                    decimals: searchTokens[token].decimals,
                  }
                  
                  setToken(setJSON);
                  onClose();
                }}
                key={index}
              >
                {/* <img
                  style={{
                    height: "32px",
                    width: "32px",
                    marginRight: "20px",
                  }}
                  src={"https://tokens.1inch.io/" + searchTokens[index].id + '.png'}
                  alt="noLogo"
                /> */}
                <div>
                  <h4>{searchTokens[index].name} - {searchTokens[index].symbol}</h4>
                  <span
                    style={{
                      
                      fontSize: "13px",
                      lineHeight: "14px",
                    }}
                  >
                    {searchTokens[index].id}
                  </span>
                </div>
            </div>
          ))
  
          : Object.keys(tokenList).map((token, index) => (
              <div
                style={{
                  padding: "5px 20px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // console.log("CLICKED")
                  // console.log(tokenList[token])
                  setToken(tokenList[token]);
                  onClose();
                }}
                key={index}
              >
                <img
                  style={{
                    height: "32px",
                    width: "32px",
                    marginRight: "20px",
                  }}
                  src={tokenList[token].logoURI}
                  alt="noLogo"
                />
                <div>
                  <h4>{tokenList[token].name}</h4>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "15px",
                      lineHeight: "14px",
                    }}
                  >
                    {tokenList[token].symbol}
                  </span>
                </div>
              </div>
            ))}
      </div>
    );
  }
}

export default InchModal;