// config/env.production.ts

// 正式环境配置
export default {
  telegramInveteUrl: 'https://t.me/IBOBrokerBot/IBOBroker',
  env: 'production',
  baseUrl: 'https://7sdn5ax6g2.execute-api.ap-east-1.amazonaws.com/',
  // baseUrl: 'http://localhost:9527/',
  imgUrl: '',
  provider: 'https://bsc-dataseed1.ninicoin.io', // bsc provider
  // 币安链ID
  ethChainNumberId: 56,
  // 币安链配置
  chainConfig: {
    chainId: '0x38',
    chainName: 'BSC Main',
    rpcUrls: ['https://bsc-dataseed1.binance.org/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  // 时间周期
  datePeriod: 86400,
  // tokenAddress
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  IBO: '0x809827bd8e1D3A54A07838766977ECF012bCcaaF',

  // contract
  swap: '0x',
  foundation: '0xF90FDF0467792497Ad1315294405731C3d37C941',
  employeeFoundation: '0xCD6bCC7F4430aAd6D0626d6f3377cAe5F103a299',

  // nft 地址
  userNft: '0xe279f318C7369BC6889C058Fd351118FF969fca7',
  juniorNft: '0x553fccE46E048e81777aBe778BE6B095646fBBE3',
  intNft: '0xD8c81D46001450Fa98Ab1e04d0868fC01e28eF81',
  advancedNft: '0x003Bf630C9C22b5fDD91F1511DF9A447A9ac9a08',

  storedValueProportion: 0.8,
}
