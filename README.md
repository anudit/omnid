# Omnid

Omnid (Omniscient-Id) aggregates multiple on/off-chain sources of reputation into an overall social graph where each source counts towards some points in building the overall TrustScore for any Ethereum Address. This score is continuously evolving. As more platforms get integrated, the weights and the score will update too.

[View Docs](https://docs.theconvo.space/docs/Convo-API/omnid)

## Deployment Addresses & Links

```json
{
  "80001": {
    "nftDescriptorV2": "0xe00E3B34C7FF1561725b56a6CCB00F47F1A313a4",
    "Omnid": "0x835796B65ECD11cD55Ff1C4940348Cb251f6c401",
    "Verifier": "0x1cb460256bcece9aa216e80ccff5c3b98f8c9263"
  }
}
```

Matic Mumbai config
- [Chainlink Oracle](https://market.link/jobs/4002bb77-a1c0-4dcc-8480-9130fa7bb26f)
- [Opensea Collection](https://testnets.opensea.io/collection/omnid-bw0qvui1hl)
- [Omnid Contract](https://mumbai.polygonscan.com/address/0x835796B65ECD11cD55Ff1C4940348Cb251f6c401)
- [NftDescriptor Contract](https://mumbai.polygonscan.com/address/0xe00E3B34C7FF1561725b56a6CCB00F47F1A313a4)
- [Verifier Contract](https://mumbai.polygonscan.com/address/0x1cb460256bcece9aa216e80ccff5c3b98f8c9263)




## Interface
```csharp
interface IOmnid {
  function getScore(address _add_) external view returns(uint256);
  function getIdDetails(address _add) external view returns(uint256, uint256, uint256, bytes32);
}
```
