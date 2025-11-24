# 🚀 Smart Contract Deployment Guide

**Goal:** Deploy ReportRegistry contract to TON Testnet  
**Time:** 30-60 minutes  
**Difficulty:** Medium

---

## 📋 Prerequisites

### 1. Install TON Development Tools

```bash
# Install Blueprint (TON development framework)
npm install -g @ton/blueprint

# Verify installation
blueprint --version
```

### 2. Get Testnet TON

**Option A: Telegram Bot (Recommended)**
1. Open Telegram
2. Search for `@testgiver_ton_bot`
3. Send your testnet wallet address
4. Receive 5 testnet TON

**Option B: TON Testnet Faucet**
1. Visit: https://testnet.tonscan.org/
2. Click "Faucet"
3. Enter wallet address
4. Request testnet TON

---

## 🏗️ Step-by-Step Deployment

### Step 1: Create Blueprint Project

```bash
# Create contracts directory if not exists
mkdir -p contracts
cd contracts

# Initialize Blueprint project
blueprint create

# Choose:
# - Project name: ReportRegistry
# - Template: Empty contract
# - Language: Tact
```

### Step 2: Copy Contract Code

```bash
# Copy our contract to the project
# File: contracts/ReportRegistry.tact
```

Contract code:
```tact
import "@stdlib/deploy";

struct Report {
    id: Int as uint32;
    hash: String;
    reporter: Address;
    timestamp: Int as uint32;
    verified: Bool;
}

message SubmitReport {
    hash: String;
}

message VerifyReport {
    id: Int as uint32;
}

contract ReportRegistry with Deployable {
    owner: Address;
    reportCount: Int as uint32 = 0;
    reports: map<Int, Report>;
    
    init(owner: Address) {
        self.owner = owner;
    }
    
    receive(msg: SubmitReport) {
        self.reportCount = self.reportCount + 1;
        
        self.reports.set(self.reportCount, Report{
            id: self.reportCount,
            hash: msg.hash,
            reporter: sender(),
            timestamp: now(),
            verified: false
        });
    }
    
    receive(msg: VerifyReport) {
        require(sender() == self.owner, "Only owner can verify");
        
        let report: Report? = self.reports.get(msg.id);
        if (report != null) {
            let r: Report = report!!;
            r.verified = true;
            self.reports.set(msg.id, r);
        }
    }
    
    get fun getReport(id: Int): Report? {
        return self.reports.get(id);
    }
    
    get fun getReportCount(): Int {
        return self.reportCount;
    }
    
    get fun getOwner(): Address {
        return self.owner;
    }
}
```

### Step 3: Compile Contract

```bash
# Build the contract
blueprint build

# You should see:
# ✓ Compiled successfully
# ✓ Contract: ReportRegistry
```

### Step 4: Deploy to Testnet

```bash
# Run deployment script
blueprint run

# Choose:
# 1. Deploy ReportRegistry
# 2. Network: testnet
# 3. Wallet: (follow prompts)
```

**Deployment Process:**
1. Blueprint will ask for wallet mnemonic or create new one
2. Make sure wallet has testnet TON (at least 0.5 TON)
3. Confirm deployment
4. Wait for transaction confirmation
5. **SAVE THE CONTRACT ADDRESS!**

Example output:
```
✓ Contract deployed successfully!
Contract address: EQC_abc123def456...
Transaction: https://testnet.tonscan.org/tx/...
Explorer: https://testnet.tonscan.org/address/EQC_abc123def456...
```

### Step 5: Verify Deployment

```bash
# Check contract on explorer
# Visit: https://testnet.tonscan.org/address/YOUR_CONTRACT_ADDRESS

# You should see:
# - Contract is active
# - Balance > 0
# - Code hash
# - Recent transactions
```

---

## 🔧 Alternative: Manual Deployment

If Blueprint doesn't work, use TON SDK directly:

### Install Dependencies

```bash
npm install @ton/ton @ton/core @ton/crypto
```

### Create Deployment Script

```typescript
// scripts/deploy.ts
import { TonClient, WalletContractV4, internal } from '@ton/ton';
import { mnemonicToPrivateKey } from '@ton/crypto';
import { Address, toNano } from '@ton/core';
import fs from 'fs';

async function deploy() {
  // Initialize client
  const client = new TonClient({
    endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  });

  // Load wallet from mnemonic
  const mnemonic = process.env.WALLET_MNEMONIC?.split(' ') || [];
  const key = await mnemonicToPrivateKey(mnemonic);
  
  const wallet = WalletContractV4.create({
    publicKey: key.publicKey,
    workchain: 0,
  });

  // Open wallet
  const walletContract = client.open(wallet);
  
  // Load compiled contract
  const contractCode = fs.readFileSync('./build/ReportRegistry.compiled.json');
  
  // Deploy
  const seqno = await walletContract.getSeqno();
  
  await walletContract.sendTransfer({
    seqno,
    secretKey: key.secretKey,
    messages: [
      internal({
        value: toNano('0.5'),
        to: contractAddress,
        init: {
          code: contractCode,
          data: initialData,
        },
      }),
    ],
  });

  console.log('Contract deployed!');
  console.log('Address:', contractAddress.toString());
}

deploy();
```

---

## 📝 Update Environment Variables

After successful deployment:

### 1. Update `.env.local`

```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=EQC_your_real_contract_address
```

### 2. Update Backend

```bash
# backend/.env
CONTRACT_ADDRESS=EQC_your_real_contract_address
```

### 3. Restart Services

```bash
# Restart backend
cd backend
npm start

# Restart frontend
npm run dev
```

---

## ✅ Verification Checklist

- [ ] Contract deployed successfully
- [ ] Contract address saved
- [ ] Contract visible on testnet explorer
- [ ] Contract has balance > 0
- [ ] Environment variables updated
- [ ] Backend restarted
- [ ] Frontend restarted
- [ ] Can view contract on explorer

---

## 🧪 Testing the Contract

### Test 1: Submit Report

```typescript
// Test submitting a report
const hash = "abc123def456...";

await tonConnectUI.sendTransaction({
  validUntil: Date.now() + 5 * 60 * 1000,
  messages: [
    {
      address: CONTRACT_ADDRESS,
      amount: '50000000', // 0.05 TON
      payload: // encoded SubmitReport message
    }
  ]
});
```

### Test 2: Query Report

```typescript
// Query report from contract
const result = await client.runMethod(
  Address.parse(CONTRACT_ADDRESS),
  'getReport',
  [{ type: 'int', value: 1n }]
);

console.log('Report:', result);
```

### Test 3: Get Report Count

```typescript
const count = await client.runMethod(
  Address.parse(CONTRACT_ADDRESS),
  'getReportCount',
  []
);

console.log('Total reports:', count);
```

---

## 🚨 Troubleshooting

### Error: "Insufficient funds"
**Solution:** Get more testnet TON from faucet

### Error: "Contract compilation failed"
**Solution:** Check Tact syntax, update @stdlib/deploy

### Error: "Network timeout"
**Solution:** Try different RPC endpoint:
- https://testnet.toncenter.com/api/v2/jsonRPC
- https://testnet.tonapi.io/v2

### Error: "Wallet not found"
**Solution:** Create new wallet or import existing mnemonic

---

## 📊 Expected Costs

- **Deployment:** ~0.5 TON (testnet)
- **Submit Report:** ~0.05 TON per transaction
- **Query (free):** 0 TON

---

## 🎯 Success Criteria

✅ Contract deployed to testnet  
✅ Contract address in environment variables  
✅ Contract visible on explorer  
✅ Can submit transactions  
✅ Can query data  
✅ Frontend shows real contract address  

---

## 📸 Screenshots for Demo

Take these screenshots:

1. Contract on testnet explorer
2. Contract code verified
3. Recent transactions
4. Contract balance
5. Report submission transaction
6. Query result

---

## 🎬 Demo Script Addition

**Show Contract:**
> "Here's our smart contract deployed on TON testnet. You can see it's active with X transactions. The contract stores cryptographic hashes of all reports immutably on the blockchain."

**Show Transaction:**
> "When a user submits a report, we generate a hash and send it to the smart contract. Here's a real transaction on the testnet explorer showing the report submission."

**Show Query:**
> "We can query any report from the blockchain using its ID. The data is immutable and transparent - anyone can verify it."

---

## 🔗 Useful Links

- **TON Testnet Explorer:** https://testnet.tonscan.org
- **TON Docs:** https://docs.ton.org
- **Blueprint:** https://github.com/ton-org/blueprint
- **Tact Language:** https://tact-lang.org
- **Testnet Faucet:** @testgiver_ton_bot

---

**Ready to deploy? Let's go! 🚀**

