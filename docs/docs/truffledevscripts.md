```
truffle compile

truffle develop

migrate

# test AlgoTokenV1
AlgoTokenV1.deployed().then(function(instance){return instance.INITIAL_SUPPLY();});
// <BN: 33b2e3c9fd0803ce8000000>
AlgoTokenV1.deployed().then(function(instance){return instance.INITIAL_SUPPLY().then(function(supply){ return supply.toString();})});
// '1000000000000000000000000000'

# test AlgoPool
// use Accounts (0) (displayed right after entering 'truffle develop')
AlgoPool.deployed().then(function(instance){return instance.isCoreTeam('<address[0]>');});
// eg. AlgoPool.deployed().then(function(instance){return instance.isCoreTeam('0x92918c7a2e0d7e288ac97eb921467347e9401bfc');});
// true
AlgoPool.deployed().then(function(instance){return instance.isCoreTeam('0x116456aC2A0C6Ff24569ffDf3fb78A98d3204065');});

# test AlgoMiner
AlgoMiner.deployed().then(function(instance){return instance.isAlgoMiner();});
// true

# test AlgoMiner type
AlgoMiner.deployed().then(function(instance){return instance.getMinerType().then(function(type){ return type.toString();});});
// '0' (0 is pool-based, 1 is non-pool-based)

#create new Miner for pool 3
AlgoMiner.new(0, 3, <addresses[2]>, <addresses[1]>, AlgoTokenV1.address);
# AlgoMiner.new(0, 3, '0x245e9442a63fa58acbd8af64683b65d397a7c56a', '0x08638a1bf9ba5a92cf39ae2e7e2f8dc2e033131d', AlgoTokenV1.address);
// '0xf504FE3629eC68F49af76f269ace6721A78aebB5'


#test new Miner Type
AlgoMiner.at('0xf504FE3629eC68F49af76f269ace6721A78aebB5').then(function(instance){return instance.getMinerType().then(function(type){ return type.toString();});});

#test new Miner Category
AlgoMiner.at('0xf504FE3629eC68F49af76f269ace6721A78aebB5').then(function(instance){return instance.getCategory().then(function(type){ return type.toString();});});

# check pool balance
AlgoTokenV1.deployed().then(function(instance){return instance.balanceOf(AlgoPool.address).then(function(supply){ return supply.toString();});});
// '0'

# transfer tokens to pool
AlgoTokenV1.deployed().then(function(instance){return instance.transfer(AlgoPool.address, 1000000000000);});

# check pool balance again
AlgoTokenV1.deployed().then(function(instance){return instance.balanceOf(AlgoPool.address).then(function(supply){ return supply.toString();});});
AlgoTokenV1.deployed().then(function(instance){return instance.balanceOf(AlgoTokenV1.address).then(function(supply){ return supply.toString();});});
// '1000000000000'
AlgoTokenV1.deployed().then(function(instance){return instance.balanceOf('0x116456aC2A0C6Ff24569ffDf3fb78A98d3204065').then(function(supply){ return supply.toString();});});

# check miner balance
AlgoTokenV1.deployed().then(function(instance){return instance.balanceOf(AlgoMiner.address).then(function(supply){ return supply.toString();});});
// '0'

# transfer from pool to miner
AlgoPool.deployed().then(function(instance){return instance.transferToMiner(AlgoMiner.address);});
```

AlgoPool.deployed().then(function(instance){return instance.transferToMiner('0xf504FE3629eC68F49af76f269ace6721A78aebB5', {gas: "4712388"});});

AlgoPool.at('0xE902FEA616B247aA99Ea14062E4ed50eb6C35467').then(function(instance){return instance.isCoreTeam('0x8867d079974b6b5ec989e99ec353be49ab6fbf0f');});
AlgoPool.at('0xE902FEA616B247aA99Ea14062E4ed50eb6C35467').then(function(instance){return instance.isCoreTeam('0xf504FE3629eC68F49af76f269ace6721A78aebB5');});


AlgoPool.at('0xE902FEA616B247aA99Ea14062E4ed50eb6C35467').then(function(instance){return instance.transferToMiner('0xf504FE3629eC68F49af76f269ace6721A78aebB5', {gas: "4712388"});});
