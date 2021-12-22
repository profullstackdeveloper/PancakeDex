import React from "react";
import styled from "styled-components";

import AppStake from "../Components/StakeComponents/AppStake";
import StakeInfo from "../Components/StakeComponents/StakeInfo";
import Rewards from "../Components/StakeComponents/Rewards";
import HowToStake from "../Components/StakeComponents/HowToStake";
const Wrapper = styled.div`
  background: #f1f5fb;
`;

const Stake = ({ collapsed }) => {
  return (
    <Wrapper>
      <AppStake />
      <StakeInfo />
      <Rewards collapsed={collapsed} />
      <HowToStake />
    </Wrapper>
  );
};
export default Stake;
