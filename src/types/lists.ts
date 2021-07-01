import { BigNumber } from 'ethers';
import { ChainKey, Coin, CoinKey, Token } from '.';

interface AddEthereumChainParameter {
  chainId: string;
  blockExplorerUrls?: string[];
  chainName?: string;
  iconUrls?: string[];
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls?: string[];
}

interface Chain {
  key: ChainKey
  name: string
  coin: CoinKey
  id: number
  visible: boolean
  metamask?: AddEthereumChainParameter
}

const prefixChainId = (chainId: number) => {
  return '0x' + BigNumber.from(chainId)._hex.split('0x')[1].replace(/\b0+/g, '')
}

export const supportedChains: Array<Chain> = [
  {
    key: ChainKey.ETH,
    name: 'Ethereum',
    coin: CoinKey.ETH,
    id: 1,
    visible: true,

    metamask: {
      chainId: prefixChainId(1),
      blockExplorerUrls: [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ],
      chainName: 'Ethereum Mainnet',
      iconUrls: [],
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: [
        'https://etherscan.io/',
      ],
    },
  },
  {
    key: ChainKey.POL,
    name: 'Polygon',
    coin: CoinKey.MATIC,
    id: 137,
    visible: true,

    // https://docs.matic.network/docs/develop/metamask/config-matic/
    metamask: {
      chainId: prefixChainId(137),
      blockExplorerUrls: [
        'https://rpc-mainnet.maticvigil.com/',
      ],
      chainName: 'Matic Mainnet',
      iconUrls: [],
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: [
        'https://polygonscan.com/',
      ],
    },
  },
  {
    key: ChainKey.BSC,
    name: 'BSC',
    coin: CoinKey.BNB,
    id: 56,
    visible: true,

    // https://docs.binance.org/smart-chain/wallet/metamask.html
    metamask: {
      chainId: prefixChainId(56),
      blockExplorerUrls: [
        'https://bsc-dataseed.binance.org/',
        'https://bsc-dataseed1.defibit.io/',
        'https://bsc-dataseed1.ninicoin.io/',
      ],
      chainName: 'Binance Smart Chain',
      iconUrls: [],
      nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: [
        'https://bscscan.com/',
      ],
    },
  },
  {
    key: ChainKey.DAI,
    name: 'xDai',
    coin: CoinKey.DAI,
    id: 100,
    visible: true,

    // https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup
    metamask: {
      chainId: prefixChainId(100),
      blockExplorerUrls: [
        'https://rpc.xdaichain.com/',
        'https://dai.poa.network/',
        'https://xdai.poanetwork.dev/',
        'https://xdai.1hive.org/',
      ],
      chainName: 'xDai',
      iconUrls: [],
      nativeCurrency: {
        name: 'xDai',
        symbol: 'xDai',
        decimals: 18,
      },
      rpcUrls: [
        'https://blockscout.com/xdai/mainnet',
      ],
    },
  },
  {
    key: ChainKey.FTM,
    name: 'Fantom',
    coin: CoinKey.FTM,
    id: 250,
    visible: false,

    // https://docs.fantom.foundation/tutorials/set-up-metamask
    metamask: {
      chainId: prefixChainId(250),
      blockExplorerUrls: [
        'https://rpcapi.fantom.network',
      ],
      chainName: 'Fantom Opera',
      iconUrls: [],
      nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18, // TODO: check
      },
      rpcUrls: [
        'https://ftmscan.com/',
      ],
    },
  },
  {
    key: ChainKey.OKT,
    name: 'OKExCHain',
    coin: CoinKey.OKT,
    id: 66,
    visible: false,

    // https://okexchain-docs.readthedocs.io/en/latest/developers/quick-start-for-mainnet.html
    metamask: {
      chainId: prefixChainId(66),
      blockExplorerUrls: [
        'https://www.oklink.com/okexchain/',
      ],
      chainName: 'OKExChain Mainnet',
      iconUrls: [],
      nativeCurrency: {
        name: 'OKT',
        symbol: 'OKT',
        decimals: 18, // TODO: check
      },
      rpcUrls: [
        'https://exchainrpc.okex.org',
      ],
    },
  },
]

export const getChainByKey = (chainKey: ChainKey) => {
  const chain = supportedChains.find(chain => chain.key === chainKey)
  if (!chain) {
    throw new Error('Invalid chainKey')
  }
  return chain
}

export const getChainById = (chainId: number) => {
  const chain = supportedChains.find(chain => chain.id === chainId)
  if (!chain) {
    throw new Error('Invalid chainId')
  }
  return chain
}

export const defaultCoins: Array<Coin> = [
  // NATIVE COINS
  {
    key: CoinKey.ETH,
    name: CoinKey.ETH,
    img_url: 'https://zapper.fi/images/networks/ethereum/0x0000000000000000000000000000000000000000.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0x0000000000000000000000000000000000000000',
        symbol: CoinKey.ETH,
        decimals: 18,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.ETH,
      },
      [ChainKey.BSC]: {
        id: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        symbol: CoinKey.ETH,
        decimals: 18,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.ETH,
      },
      [ChainKey.POL]: {
        id: '0xfd8ee443ab7be5b1522a1c020c097cff1ddc1209',
        symbol: CoinKey.ETH,
        decimals: 18,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.ETH,
      },
      [ChainKey.DAI]: {
        id: '0xa5c7cb68cd81640d40c85b2e5ec9e4bb55be0214',
        symbol: CoinKey.ETH,
        decimals: 18,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.ETH,
      },
    },
  },
  {
    key: CoinKey.MATIC,
    name: CoinKey.MATIC,
    img_url: 'https://zapper.fi/images/networks/polygon/0x0000000000000000000000000000000000000000.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
        symbol: CoinKey.MATIC,
        decimals: 18,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.MATIC,
      },
      [ChainKey.BSC]: {
        id: '0xa90cb47c72f2c7e4411e781772735d9317d08dd4',
        symbol: CoinKey.MATIC,
        decimals: 8,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.MATIC,
      },
      [ChainKey.POL]: {
        id: '0x0000000000000000000000000000000000000000',
        symbol: CoinKey.MATIC,
        decimals: 18,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.MATIC,
      },
      [ChainKey.DAI]: {
        id: '0x7122d7661c4564b7c6cd4878b06766489a6028a2',
        symbol: CoinKey.MATIC,
        decimals: 18,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.MATIC,
      },
    },
  },
  {
    key: CoinKey.BNB,
    name: CoinKey.BNB,
    img_url: 'https://zapper.fi/images/networks/binance-smart-chain/0x0000000000000000000000000000000000000000.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
        symbol: CoinKey.BNB,
        decimals: 18,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.BNB,
      },
      [ChainKey.BSC]: {
        id: '0x0000000000000000000000000000000000000000',
        symbol: CoinKey.BNB,
        decimals: 18,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.BNB,
      },
      [ChainKey.POL]: {
        id: '0xa649325aa7c5093d12d6f98eb4378deae68ce23f',
        symbol: CoinKey.BNB,
        decimals: 18,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.BNB,
      },
      [ChainKey.DAI]: {
        id: '0xca8d20f3e0144a72c6b5d576e9bd3fd8557e2b04',
        symbol: CoinKey.BNB,
        decimals: 18,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.BNB,
      },
    },
  },
  {
    key: CoinKey.DAI,
    name: CoinKey.DAI,
    img_url: 'https://zapper.fi/images/networks/ethereum/0x6b175474e89094c44da98b954eedeac495271d0f.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0x6b175474e89094c44da98b954eedeac495271d0f',
        symbol: CoinKey.DAI,
        decimals: 18,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.DAI,
      },
      [ChainKey.BSC]: {
        id: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        symbol: CoinKey.DAI,
        decimals: 18,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.DAI,
      },
      [ChainKey.POL]: {
        id: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
        symbol: CoinKey.DAI,
        decimals: 18,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.DAI,
      },
      [ChainKey.DAI]: {
        id: '0x0000000000000000000000000000000000000000',
        symbol: CoinKey.DAI,
        decimals: 18,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.DAI,
      },
    },
  },


  // OTHER STABLECOINS
  {
    key: CoinKey.USDT,
    name: CoinKey.USDT,
    img_url: 'https://zapper.fi/images/networks/ethereum/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        symbol: CoinKey.USDT,
        decimals: 6,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.USDT,
      },
      [ChainKey.BSC]: {
        id: '0x55d398326f99059ff775485246999027b3197955',
        symbol: CoinKey.USDT,
        decimals: 18,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.USDT,
      },
      [ChainKey.POL]: {
        id: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
        symbol: CoinKey.USDT,
        decimals: 6,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.USDT,
      },
      [ChainKey.DAI]: {
        id: '0x4ecaba5870353805a9f068101a40e0f32ed605c6',
        symbol: CoinKey.USDT,
        decimals: 6,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.USDT,
      },
    },
  },
  {
    key: CoinKey.USDC,
    name: CoinKey.USDC,
    img_url: 'https://zapper.fi/images/networks/ethereum/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
    chains: {
      [ChainKey.ETH]: {
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        symbol: CoinKey.USDC,
        decimals: 6,
        chainId: 1,
        chainKey: ChainKey.ETH,
        key: CoinKey.USDC,
      },
      [ChainKey.BSC]: {
        id: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        symbol: CoinKey.USDC,
        decimals: 18,
        chainId: 56,
        chainKey: ChainKey.BSC,
        key: CoinKey.USDC,
      },
      [ChainKey.POL]: {
        id: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        symbol: CoinKey.USDC,
        decimals: 6,
        chainId: 137,
        chainKey: ChainKey.POL,
        key: CoinKey.USDC,
      },
      [ChainKey.DAI]: {
        id: '0xddafbb505ad214d7b80b1f830fccc89b60fb7a83',
        symbol: CoinKey.USDC,
        decimals: 6,
        chainId: 100,
        chainKey: ChainKey.DAI,
        key: CoinKey.USDC,
      },
    },
  },
]

export const findDefaultCoin = (coinKey: CoinKey) => {
  const coin = defaultCoins.find(coin => coin.key === coinKey)
  if (!coin) {
    throw new Error('Invalid Coin')
  }
  return coin
}


export const wrappedTokens: { [ChainKey: string]: Token } = {
  [ChainKey.ETH]: {
    // https://ww7.etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
    id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    symbol: 'WETH',
    decimals: 18,
    chainId: 1,
    chainKey: ChainKey.ETH,
    key: 'WETH',
  },
  [ChainKey.BSC]: {
    // https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c
    id: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    symbol: 'WBNB',
    decimals: 18,
    chainId: 56,
    chainKey: ChainKey.BSC,
    key: 'WBNB',
  },

  [ChainKey.POL]: {
    // https://polygonscan.com/token/0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270
    id: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    symbol: 'WMATIC',
    decimals: 18,
    chainId: 137,
    chainKey: ChainKey.POL,
    key: 'WMATIC',
  },
  [ChainKey.DAI]: {
    // https://blockscout.com/xdai/mainnet/address/0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d
    id: '0xe91d153e0b41518a2ce8dd3d7944fa863463a97d',
    symbol: 'WXDAI',
    decimals: 18,
    chainId: 100,
    chainKey: ChainKey.DAI,
    key: 'WXDAI',
  },
}
