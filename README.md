# Convo Contracts

## Deployment Addresses & Links

### V1

```json
{
  "80001": {
    "NftDescriptor": "0x1DcB8c596618Bc969732254eaa0893866d1BD3FD",
    "Omnid": "0xCe439983CDB28864F1d65C27379D8b3ef92192b4"
  },
  "65": {
    "NftDescriptor": "0x65CAEC30a86135c1dce58f8d4b469E67F87692c2",
    "Omnid": "0x71f66599Ee700b14dE3F00EF6620cbA70964a1D3"
  }
}
```

Matic Mumbai config
- [Chainlink Oracle](https://market.link/jobs/4002bb77-a1c0-4dcc-8480-9130fa7bb26f)
- [Opensea Collection](https://testnets.opensea.io/collection/omnid-49wswfcoyi)
- [Omnid Contract](https://mumbai.polygonscan.com/address/0xCe439983CDB28864F1d65C27379D8b3ef92192b4)
- [NftDescriptor Contract](https://mumbai.polygonscan.com/address/0x1DcB8c596618Bc969732254eaa0893866d1BD3FD)


## Interface
```csharp
interface IOmnid {
  function getScore(address _add_) external view returns(uint256);
  function getIdDetails(address _add) external view returns(uint256, uint256, uint256, bytes32);
}
```
