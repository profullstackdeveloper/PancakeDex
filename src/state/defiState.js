import React, {useEffect, useState} from 'react';

export const DefiContext = React.createContext({});
 
export const DefiProvider = ({children}) => {
  const [tokenInfoState, setTokenInfoState] = useState()
  const [selectedToken, setSelectedToken] = useState({
    address: "0xa72ff2b799324b042ae379809ee54dace99db3a5",
    name: "Miss Doge",
    symbol: "MDOGE"
  })
  const [busdStatePrice, setBUSDStatePrice] = useState();
  const [searchTokenState, setSearchTokenState] = useState({})
  const [tokenQuoteId, setTokenQuoteId] = useState();
  const [wholeTokens, setWholeTokens] = useState([]);


  return (
    <DefiContext.Provider
      value = {
        {
          setSelectedToken,
          selectedToken,
          setTokenInfoState,
          tokenInfoState,
          setBUSDStatePrice,
          busdStatePrice,
          setSearchTokenState,
          searchTokenState,
          tokenQuoteId,
          setTokenQuoteId,
          wholeTokens,
          setWholeTokens
        }
      }
    >
      {children}
    </DefiContext.Provider>
  )
}