import { PancakeswapPair, PancakeswapPairSettings } from 'simple-pancakeswap-sdk';

export const pancakeswapPair = new PancakeswapPair({
    // the contract address of the token you want to convert FROM
    fromTokenContractAddress: '0x101d82428437127bf1608f699cd651e6abf9766e',
    // the contract address of the token you want to convert TO
    toTokenContractAddress: '0xBf5140A22578168FD562DCcF235E5D43A02ce9B1',
    // the ethereum address of the user using this part of the dApp
    ethereumAddress: '0xB1E6079212888f0bE0cf55874B2EB9d7a5e02cD9',
    // you can pass in the provider url as well if you want
    // providerUrl: YOUR_PROVIDER_URL,
    settings: new PancakeswapPairSettings({
      // if not supplied it will use `0.005` which is 0.5%
      // please pass it in as a full number decimal so 0.7%
      // would be 0.007
      slippage: 0.005,
      // if not supplied it will use 20 a deadline minutes
      deadlineMinutes: 20,
      // if not supplied it will try to use multihops
      // if this is true it will require swaps to direct
      // pairs
      disableMultihops: false,
    }),
  });
  

  
  
  