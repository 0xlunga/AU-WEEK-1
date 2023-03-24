
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

app.use(cors());
app.use(express.json());

const balances = {
  'da83a52a59de292ec5e0': 100,
  "199837745f551a330e8f": 50,
  "da83a52a59de292ec5e0": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, nonce, signTxn } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const [signature, recoveryBit] = signTxn;
  const formattedSignature = Uint8Array.from(Object.values(signature));
  const msgToBytes = utf8ToBytes(recipient + amount + JSON.stringify(nonce));
  const msgHash = toHex(keccak256(msgToBytes));
  const publicKey = await secp.recoverPublicKey(msgHash, formattedSignature, recoveryBit);
  const verifyTx = secp.verify(formattedSignature, msgHash, publicKey)

  if (!verifyTx) {
    res.status(400).send({ message: "Invalid Transection" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  }
  else if (sender == recipient) {
    res.status(400).send({ message: "Please! Enter Another address" })
  }
  
  else if(recipient && amount) {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
  else {
    res.status(400).send({ message: "Something Went Wrong !!" })
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
  
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
