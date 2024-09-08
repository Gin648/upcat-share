// config/env.development.ts
// 本地环境配置
// baseUrl: '',
// baseUrl: 'https://fpnvwk3ege.execute-api.ap-east-1.amazonaws.com/',
// baseUrl: 'https://test.3ibo.com/api/', 测试服接口
export default {
    telegramInveteUrl: 'https://t.me/ibo130Test_bot/ibozzzzzq',
    // telegramInveteUrl: 'https://t.me/mytestIboBot/iboapp',
    env: 'development',
    baseUrl: 'http://16.163.120.57:9981',
    imgUrl: '',
    provider: 'https://data-seed-prebsc-1-s2.bnbchain.org:8545', // bsc provider
    // 币安测试链ID
    ethChainNumberId: 97,
    // 币安链配置
    chainConfig: {
        chainId: '0x61',
        chainName: 'BNB Smart Chain Testnet',
        rpcUrls: ['https://data-seed-prebsc-1-s2.bnbchain.org:8545'],
        nativeCurrency: {
            name: 'tBNB',
            symbol: 'tBNB',
            decimals: 18,
        },
        blockExplorerUrls: ['https://testnet.bscscan.com'],
    },
    // 时间周期
    datePeriod: 86400,
    // tokenAddress
    BNB: '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    USDT: '0x62a0C308bF981Bc42313EB6CaE9C714a9Ae89148',
    IBO: '0x5ec572729FD9c92005c275e48Fd830529A0aB665',

    // contract
    swap: '0xd99d1c33f9fc3444f8101754abc46c52416550d1',
    foundation: '0xf9726504e9075646e7E434C71fB1CFF446aC84b2',
    employeeFoundation: '0xF7b67D7E2975002f245BAA7C7408f8a6a4C54705',

    // nft 地址
    userNft: '0xe279f318C7369BC6889C058Fd351118FF969fca7',
    juniorNft: '0x553fccE46E048e81777aBe778BE6B095646fBBE3',
    intNft: '0xD8c81D46001450Fa98Ab1e04d0868fC01e28eF81',
    advancedNft: '0x003Bf630C9C22b5fDD91F1511DF9A447A9ac9a08',

    storedValueProportion: 0.8,
}
