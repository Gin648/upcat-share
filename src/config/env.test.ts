// config/env.test.ts
// 测试环境配置
export default {
  telegramInveteUrl: 'https://t.me/mytestIboBot/iboapp',
  env: 'production',
  baseUrl: 'http://43.200.51.120:9527',
  imgUrl: 'https://flashmall.app',
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
      decimals: 18
    },
    blockExplorerUrls: ['https://bscscan.com/']
  },
  // 时间周期
  datePeriod: 86400,
  // tokenAddress
  BNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  USDT: '0x55d398326f99059fF775485246999027B3197955',
  foundation: '0x7d5335419D13dA4CB6D33954c1a9D6E3cd653cbf',
  employeeFoundation: '0xF7b67D7E2975002f245BAA7C7408f8a6a4C54705',

  // nft 地址
  userNft: '0xe279f318C7369BC6889C058Fd351118FF969fca7',
  juniorNft: '0x553fccE46E048e81777aBe778BE6B095646fBBE3',
  intNft: '0xD8c81D46001450Fa98Ab1e04d0868fC01e28eF81',
  advancedNft: '0x003Bf630C9C22b5fDD91F1511DF9A447A9ac9a08',
  // contract
  storedValueProportion: 0.8
}
