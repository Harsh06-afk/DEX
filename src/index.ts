import express from "express";

const app = express();
app.use(express.json());

let eth_balance = 200;
let usdc_balance = 700000;

app.post("/buy-assesst", (req, res) => {
  const product = eth_balance * usdc_balance;
  const quantity = req.body.quantity;
  const updatedEthQuantity = eth_balance - quantity;
  const updatedUsdcBalance = eth_balance * usdc_balance / updatedEthQuantity;
  const paidAmount = updatedUsdcBalance - usdc_balance;
  eth_balance = updatedEthQuantity;
  usdc_balance = updatedUsdcBalance;

  res.json({
    message: `You paid ${paidAmount} USDC for ${quantity} ETH`

  })
} )

app.post("/sell-assesst", (req, res) => {
  const quantity = req.body.quantity;
  const updatedUsdcBalance = usdc_balance - quantity;
  const updatedEthQuantity = eth_balance * usdc_balance / updatedUsdcBalance;
  const paidAmount = updatedUsdcBalance - eth_balance;

  eth_balance = updatedEthQuantity;
  usdc_balance = updatedUsdcBalance;
  
  res.json({
    message: `You got ${quantity} ETH for ${paidAmount} USDC`

  })
})

app.listen(3000);
