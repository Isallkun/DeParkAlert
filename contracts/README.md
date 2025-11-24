# DeParkAlert Smart Contract

TON Blockchain smart contract for report registry.

## Contract: ReportRegistry

Stores cryptographic hashes of reports on TON blockchain for immutability and verification.

## Features

- ✅ Submit report hashes
- ✅ Verify reports (owner only)
- ✅ Query reports by ID
- ✅ Get report count
- ✅ Immutable storage

## Setup

### Prerequisites

```bash
# Install TON development tools
npm install -g @ton/blueprint

# Or use yarn
yarn global add @ton/blueprint
```

### Create Project

```bash
# Create new blueprint project
blueprint create ReportRegistry

# Copy ReportRegistry.tact to contracts folder
```

### Compile

```bash
blueprint build
```

### Deploy to Testnet

```bash
# Make sure you have testnet TON
blueprint run

# Follow prompts to deploy
# Save the contract address!
```

### Test

```bash
# Run tests
blueprint test
```

## Contract Structure

```tact
struct Report {
    id: Int
    hash: String
    reporter: Address
    timestamp: Int
    verified: Bool
}

contract ReportRegistry {
    - owner: Address
    - reportCount: Int
    - reports: map<Int, Report>
    
    + submitReport(hash: String)
    + verifyReport(id: Int)
    + getReport(id: Int): Report?
    + getReportCount(): Int
}
```

## Usage

### Submit Report

```typescript
import { Address } from '@ton/core';

const contract = client.open(ReportRegistry.fromAddress(contractAddress));

await contract.send(
  provider.sender(),
  { value: toNano('0.05') },
  {
    $$type: 'SubmitReport',
    hash: 'abc123...',
  }
);
```

### Query Report

```typescript
const report = await contract.getReport(1n);
console.log(report);
```

## Deployment

### Testnet

```bash
# Get testnet TON from faucet
# https://t.me/testgiver_ton_bot

# Deploy
blueprint run

# Contract address will be shown
# Example: EQC_abc123...
```

### Mainnet

```bash
# Make sure you have real TON
# Update network config to mainnet
# Deploy with caution!
blueprint run --mainnet
```

## Integration

### Frontend

```typescript
// lib/blockchain.ts
export const CONTRACT_ADDRESS = 'EQC_your_address';

export async function submitToBlockchain(hash: string) {
  // Use TonConnect to send transaction
  const tx = await tonConnectUI.sendTransaction({
    validUntil: Date.now() + 5 * 60 * 1000,
    messages: [
      {
        address: CONTRACT_ADDRESS,
        amount: '50000000', // 0.05 TON
        payload: // encoded message
      }
    ]
  });
  
  return tx;
}
```

### Backend

```javascript
const { TonClient } = require('@ton/ton');

const client = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
});

async function getReportFromBlockchain(reportId) {
  const result = await client.runMethod(
    contractAddress,
    'getReport',
    [{ type: 'int', value: reportId }]
  );
  return result;
}
```

## Gas Fees

- Submit report: ~0.05 TON
- Verify report: ~0.03 TON
- Query (free): 0 TON

## Security

- Only owner can verify reports
- Immutable once submitted
- Transparent and auditable
- Decentralized storage

## Roadmap

- [ ] Add reward distribution
- [ ] Add staking mechanism
- [ ] Add governance voting
- [ ] Add multi-sig verification
- [ ] Add report categories

## Resources

- [TON Docs](https://docs.ton.org)
- [Tact Language](https://tact-lang.org)
- [Blueprint](https://github.com/ton-org/blueprint)
- [TON Connect](https://docs.ton.org/develop/dapps/ton-connect)

## License

MIT
