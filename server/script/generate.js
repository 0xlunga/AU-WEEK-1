const secp = require("ethereum-cryptography/secp256k1")
const { toHex } = require("ethereum-cryptography/utils")

function generateKeys() {

    keys = {}

    for (let i = 0; i < 3; i++) {
        const privateKey = toHex(secp.utils.randomPrivateKey());
        const publicKey = toHex(secp.getPublicKey(privateKey))
        const address = publicKey.slice(-20)
        keys["key"+i] = [privateKey, publicKey, address]
    }
    return keys
}
console.log(generateKeys())
/* {
  key0: [
    'e7a4d5be0bbda39525edd37f47d2e8e7fb5199c178f6e42fa50abcadc5fec3e2',
    '0470736e542733093a90bc31a6ff5e6516ffe9bba5e90d3795a262f3d3fc138bd1bb91414026c0dba4fe8787b3cd2fba431d1b4a6dfbdc50673672e6b84ea9b6a8',
    '50673672e6b84ea9b6a8'
  ],
  key1: [
    'dad7d651f47bb87b80bbe343b0c548c26b0fce0afbd42e3808e4a8f9f812ae6e',
    '0453a5e6db864bae6c5c9a41a9640e51206ae01fd521154fecbd9a9effb045a241b0c9bdca098f77157df52a04aa8f4b8ca284a1f260d6199837745f551a330e8f',
    '199837745f551a330e8f'
  ],
  key2: [
    '7b50c265d1c9a9dfe407967074de07444d91617f412947de1884c1a258654fca',
    '04a51c7fe40a5eedd9a5f2344a1d285576daef3d9936e28a73cabfdd0709acb904d884d7dade303362276a41351f1556ef31ea89454716da83a52a59de292ec5e0',
    'da83a52a59de292ec5e0'
  ]
}
  */