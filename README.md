# Convo Contracts

## Deployment Addresses & Links
```json
{
  "80001": {
    "NftDescriptor": "0x1AC0B2796deebAb472AF7479D75697E1301CDf2b",
    "Omnid": "0xEF071D4306823F48cDc22123A53301B4454B7ace"
  }
}
```

Matic Mumbai config
- [Chainlink Oracle](https://market.link/jobs/4002bb77-a1c0-4dcc-8480-9130fa7bb26f)
- [Opensea Collection](https://testnets.opensea.io/collection/omnid-dxnq0doh6x)
- [Omnid Contract](https://mumbai.polygonscan.com/address/0xEF071D4306823F48cDc22123A53301B4454B7ace)
- [NftDescriptor Contract](https://mumbai.polygonscan.com/address/0x1AC0B2796deebAb472AF7479D75697E1301CDf2b)


## Interface
```csharp
interface IOmnid {
  function getScore(address _add_) external view returns(uint256);
}
```
