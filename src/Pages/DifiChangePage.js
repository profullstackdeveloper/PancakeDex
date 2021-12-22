import React from "react";
import styled from "styled-components";

// import MostViewed from "../Components/DifiChange/MostViewed";
// import Token from "../Components/DifiChange/Token";
// import TradeToken from "../Components/DifiChange/TradeToken";

// import TokenPrice from "../Components/DifiChange/TokenPrice";
import ChitAndChart from "../Components/DifiChange/ChatAndChart";
const Wrapper = styled.div`
  height: 100%;
`;

const DifiChange = () => {
  return (
    <Wrapper>

      {/* <MostViewed /> */}
      {/* <Token /> */}

      <ChitAndChart />
      {/* <TradeToken /> */}
      {/* <TokenPrice /> */}
    </Wrapper>
  );
};
export default DifiChange;
