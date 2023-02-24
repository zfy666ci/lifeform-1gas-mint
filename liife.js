const fs = require("fs");
const axios = require("axios");

const ERC20ABI = require("./bep20.json");
const Web3 = require("web3");
 
const config=require("./config.json")

const iniv=config.iniv
const delay=config.delay

const web3 = new Web3("https://rpc-bsc.bnb48.club");
const contract = "0x37ac6a9b55dcec42145a2147c2fcccb4c737c7e4";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "SIGNER", type: "address" },
      { internalType: "address", name: "stakeErc20", type: "address" },
      { internalType: "uint256", name: "stakeAmount", type: "uint256" },
      { internalType: "address", name: "costErc20", type: "address" },
      { internalType: "uint256", name: "costAmount", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "blockNum",
        type: "uint256",
      },
    ],
    name: "eUpdateSigner",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "EIP712DOMAIN_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TYPE_HASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_SIGNER",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_costAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_costErc20",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "_mintTimes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_onceSignCode",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_stakeAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_stakeErc20",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "rule", type: "address" }],
    name: "addMintRule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintRules",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "mintType", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getTheMintTimes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "mintRule", type: "address" },
          { internalType: "uint256", name: "udIndex", type: "uint256" },
          { internalType: "address", name: "stakeErc20", type: "address" },
          {
            internalType: "uint256",
            name: "stakeErc20Amount",
            type: "uint256",
          },
          { internalType: "address", name: "costErc20", type: "address" },
          { internalType: "uint256", name: "costErc20Amount", type: "uint256" },
          { internalType: "uint256", name: "limitTimes", type: "uint256" },
          { internalType: "uint256", name: "mintType", type: "uint256" },
          { internalType: "bytes32", name: "signCode", type: "bytes32" },
          { internalType: "bytes", name: "wlSignature", type: "bytes" },
        ],
        internalType: "struct ICartoonMintRule.MintRule",
        name: "mintData",
        type: "tuple",
      },
    ],
    name: "hashCondition",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "mintRule", type: "address" },
          { internalType: "uint256", name: "udIndex", type: "uint256" },
          { internalType: "address", name: "stakeErc20", type: "address" },
          {
            internalType: "uint256",
            name: "stakeErc20Amount",
            type: "uint256",
          },
          { internalType: "address", name: "costErc20", type: "address" },
          { internalType: "uint256", name: "costErc20Amount", type: "uint256" },
          { internalType: "uint256", name: "limitTimes", type: "uint256" },
          { internalType: "uint256", name: "mintType", type: "uint256" },
          { internalType: "bytes32", name: "signCode", type: "bytes32" },
          { internalType: "bytes", name: "wlSignature", type: "bytes" },
        ],
        internalType: "struct ICartoonMintRule.MintRule",
        name: "mintData",
        type: "tuple",
      },
    ],
    name: "hashDigest",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "bytes32", name: "signCode", type: "bytes32" },
    ],
    name: "hashWhiteList",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "signCode", type: "bytes32" }],
    name: "isExistSignCode",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "mintRule", type: "address" },
          { internalType: "uint256", name: "udIndex", type: "uint256" },
          { internalType: "address", name: "stakeErc20", type: "address" },
          {
            internalType: "uint256",
            name: "stakeErc20Amount",
            type: "uint256",
          },
          { internalType: "address", name: "costErc20", type: "address" },
          { internalType: "uint256", name: "costErc20Amount", type: "uint256" },
          { internalType: "uint256", name: "limitTimes", type: "uint256" },
          { internalType: "uint256", name: "mintType", type: "uint256" },
          { internalType: "bytes32", name: "signCode", type: "bytes32" },
          { internalType: "bytes", name: "wlSignature", type: "bytes" },
        ],
        internalType: "struct ICartoonMintRule.MintRule",
        name: "mintData",
        type: "tuple",
      },
      { internalType: "bytes", name: "dataSignature", type: "bytes" },
    ],
    name: "mintAvatar721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "rule", type: "address" }],
    name: "removeMintRule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "enable", type: "bool" }],
    name: "setOnceSignCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "costErc20", type: "address" },
      { internalType: "uint256", name: "costAmount", type: "uint256" },
    ],
    name: "updateCostErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "SIGNER", type: "address" }],
    name: "updateSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "stakeErc20", type: "address" },
      { internalType: "uint256", name: "stakeAmount", type: "uint256" },
    ],
    name: "updateStakeErc20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "mintRule", type: "address" },
          { internalType: "uint256", name: "udIndex", type: "uint256" },
          { internalType: "address", name: "stakeErc20", type: "address" },
          {
            internalType: "uint256",
            name: "stakeErc20Amount",
            type: "uint256",
          },
          { internalType: "address", name: "costErc20", type: "address" },
          { internalType: "uint256", name: "costErc20Amount", type: "uint256" },
          { internalType: "uint256", name: "limitTimes", type: "uint256" },
          { internalType: "uint256", name: "mintType", type: "uint256" },
          { internalType: "bytes32", name: "signCode", type: "bytes32" },
          { internalType: "bytes", name: "wlSignature", type: "bytes" },
        ],
        internalType: "struct ICartoonMintRule.MintRule",
        name: "mintData",
        type: "tuple",
      },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "bytes", name: "dataSignature", type: "bytes" },
    ],
    name: "verify",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "mintRule", type: "address" },
          { internalType: "uint256", name: "udIndex", type: "uint256" },
          { internalType: "address", name: "stakeErc20", type: "address" },
          {
            internalType: "uint256",
            name: "stakeErc20Amount",
            type: "uint256",
          },
          { internalType: "address", name: "costErc20", type: "address" },
          { internalType: "uint256", name: "costErc20Amount", type: "uint256" },
          { internalType: "uint256", name: "limitTimes", type: "uint256" },
          { internalType: "uint256", name: "mintType", type: "uint256" },
          { internalType: "bytes32", name: "signCode", type: "bytes32" },
          { internalType: "bytes", name: "wlSignature", type: "bytes" },
        ],
        internalType: "struct ICartoonMintRule.MintRule",
        name: "mintData",
        type: "tuple",
      },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "verifyCondition",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "hash", type: "bytes32" },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "verifySignature",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
const myContractInstance = new web3.eth.Contract(abi, contract);

const headers = {
  Host: "api-v2.lifeform.cc",
  Connection: "keep-alive",
  "Content-Type": "application/json",

  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
};

function signData(address, privateKey) {
  let signdata = "address=" + address + ",chain_id=56";
  console.log(signdata);
  return web3.eth.accounts.sign(signdata, privateKey).signature;
}
const formatRoundNum = (num, pre) =>
  (Math.floor(num * Math.pow(10, pre)) / Math.pow(10, pre)).toFixed(pre);

function sleep(ts) {
  return new Promise((resolve) => setTimeout(resolve, ts));
}
async function sendTry(tx, privateKey) {
  try {
    var signed = await web3.eth.accounts.signTransaction(tx, privateKey);

    var tran = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return tran;
  } catch (error) {
    console.log(error);
  }
}

async function transferToken(address, nextAddress, privateKey, amount) {
  const nonce = await web3.eth.getTransactionCount(address, "pending"); // 获取发送方当前nonce
  const tokenContract = new web3.eth.Contract(
    ERC20ABI,
    "0xe6df05ce8c8301223373cf5b969afcb1498c5528"
  );
  var transfer = tokenContract.methods.transfer(
    nextAddress,
    web3.utils.toWei(amount)
  );
  var encodedABI = transfer.encodeABI();
  let tx = {
    to: "0xe6df05ce8c8301223373cf5b969afcb1498c5528",
    gas: "600000",
    gasPrice: web3.utils.toWei("1", "gwei"),
    nonce: nonce,
    data: encodedABI,
  };

  let result = await sendTry(tx, privateKey);
  console.log(`${address}转账代币${amount}hash []` + result.transactionHash);
}

async function transfer(address, nextAddress, privateKey, amount) {
  const nonce = await web3.eth.getTransactionCount(address, "pending"); // 获取发送方当前nonce

  let newGas = web3.utils.fromWei(
    (parseFloat(web3.utils.toWei('1','gwei')) * parseFloat("21000")).toString(),
    "ether"
  );

  let num = parseFloat(amount);
  console.log(num)
  newGas = parseFloat(newGas);
  let newNum = accSub(parseFloat(num), parseFloat(newGas));

  newNum = web3.utils.toWei(newNum.toString(), "ether");
 

  let tx = {
    to: nextAddress,
    gas: "21000",
    gasPrice: web3.utils.toWei("1", "gwei"),
    value:newNum,
    nonce: nonce,
  };

  let result = await sendTry(tx, privateKey);
  console.log(`${address}转账代币${amount}  [hash` + result.transactionHash);
}

async function checkETHBalance(address) {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether");
}

async function checkTokenBalance(tokenAddress, accountAddress) {
  const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(accountAddress).call();
  return web3.utils.fromWei(balance, "ether");
}

async function lifeLogin(address, sign) {
  const url = "https://api-v2.lifeform.cc/api/v1/wallet_login";

  const data = JSON.stringify({ address, chain_id: 56, sign: sign });
  return await axios.post(url, data, { headers }).catch((err) => {
    console.log("post content：" + err);
  });
}

async function web3Mint(signCode, wlSignature, dataSignature, privateKey) {
  let dete = [
    "0x0C522b99695e6555c5CE853f3d8d76Cb027f6Ea0",
    262145,
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    "0",
    "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    0,
    1,
    1,
    signCode,
    wlSignature,
  ];
  var transfer = myContractInstance.methods.mintAvatar721(dete, dataSignature);
  var encodedABI = transfer.encodeABI();
  var tx = {
    to: "0x37ac6a9b55dcec42145a2147c2fcccb4c737c7e4",
    gas: "250000",
    gasPrice: web3.utils.toWei("1.2", "gwei"),
    data: encodedABI,
  };
  let result = await sendTry(tx, privateKey);
  console.log(`mint hash` + result.transactionHash);
}


function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
      r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
      r1 = 0;
  }
  try {
      r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
      r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 给Number类型增加一个mul方法，调用起来更加方便。
Number.prototype.sub = function(arg) {
  return accMul(arg, this);
};

async function lifeSign(address, inivt, access_token) {
  const headers = {
    Host: "pandora.lifeform.cc",
    Connection: "keep-alive",
    "Content-Type": "application/json",
    Authorization: access_token,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
  };

  const url =
    "https://pandora.lifeform.cc/lifeform_bsc_prod/api/avatarCartoon/easyMintAvatar";

  const data = JSON.stringify({ gender: "female", address, affAddress: inivt });

  return await axios.post(url, data, { headers }).catch((err) => {
    console.log("post content：" + err);
  });
}
async function main() {
  const fsData = fs.readFileSync(__dirname + "/account.txt");
  const _data = fsData
    .toString()
    .split(/[(\r\n)\r\n]+/)
    .filter((d) => d);
  const accounts = _data.map((data) => {
    const info = data.split("----");
    return { address: info[0], privateKey: info[1] };
  });

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i];
    let nextAccount = [];
    if (i == accounts.length-1) {
      console.log(`已经全部执行完毕${new Date()}`);
      
      break;
    } else {
      nextAccount = accounts[i + 1];
    }

    const { address, privateKey } = account;

    let sign = signData(address, privateKey);
    let lifeLoginResult = await lifeLogin(address, sign);
    let access_token = lifeLoginResult.data.data.header;
    if (access_token) {
      console.log(`${address}登录成功正在获取Mint签名数据`);
      let lifeSignResult = await lifeSign(
        address,
        iniv,
        access_token
      );
      let signCode = lifeSignResult.data.result.condition.signCode;
      let wlSignature = lifeSignResult.data.result.condition.wlSignature;
      let dataSignature = lifeSignResult.data.result.dataSignature.signature;
      if (signCode!='0x0000000000000000000000000000000000000000000000000000000000000000') {
        console.log(dataSignature);
        await web3Mint(signCode, wlSignature, dataSignature, privateKey);
        let amount = await checkTokenBalance(
          "0xe6DF05CE8C8301223373CF5B969AFCb1498c5528",
          address
        );
        console.log(`获取到KDOGE余额` + amount);
        if (amount > 0) {
          console.log("转移到下一个地址" + nextAccount.address);
          await transferToken(address, nextAccount.address, privateKey, amount);
        }
        amount = await checkETHBalance(address);
        if (amount > 0) {
          console.log("转移到下一个地址" + nextAccount.address);
          await transfer(address, nextAccount.address, privateKey, amount);
          console.log(`延迟${delay}/s后继续操作`)
          await sleep(delay)
        }

        console.log("此地址执行完成执行下一个地址" + nextAccount.address);
      } else {
        console.log(`${address}签名获取失败${lifeSignResult.data}`);
        let amount = await checkTokenBalance(
          "0xe6DF05CE8C8301223373CF5B969AFCb1498c5528",
          address
        );
        console.log(`获取到KDOGE余额` + amount);
        if (amount > 0) {
          console.log("转移到下一个地址" + nextAccount.address);
          await transferToken(address, nextAccount.address, privateKey, amount);
        }
        amount = await checkETHBalance(address);
        if (amount > 0) {
          console.log("转移到下一个地址" + nextAccount.address);
          await transfer(address, nextAccount.address, privateKey, amount);
          console.log(`延迟${delay}/s后继续操作`)
          await sleep(delay)
        }
      }
    } else {
      console.log(
        `${address}登录失败${lifeLoginResult.data}继续下一账号${nextAccount.address}`
        
      );
      let amount = await checkTokenBalance(
        "0xe6DF05CE8C8301223373CF5B969AFCb1498c5528",
        address
      );
      console.log(`获取到KDOGE余额` + amount);
      if (amount > 0) {
        console.log("转移到下一个地址" + nextAccount.address);
        await transferToken(address, nextAccount.address, privateKey, amount);
      }
      amount = await checkETHBalance(address);
      if (amount > 0) {
        console.log("转移到下一个地址" + nextAccount.address);
        await transfer(address, nextAccount.address, privateKey, amount);
        console.log(`延迟${delay}/s后继续操作`)
        await sleep(delay)
      }
  
    }
  }
}

main();
