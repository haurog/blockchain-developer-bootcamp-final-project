[![Netlify Status](https://api.netlify.com/api/v1/badges/5561d0b9-0edc-4994-afea-e8013861e87f/deploy-status)](https://app.netlify.com/sites/warrantcanary/deploys)

# Final Project: A warrant canary with enclosed funds

The idea of this project is to build a [warrant canary contract](https://en.wikipedia.org/wiki/Warrant_canary), which allows users of the contract to passively inform a broad audience that a certain event has happened by not updating the a timestamp in the contract. Additionally, a user can enclose funds in the contract which can be moved by a predefined third party to their own wallet. In this configuration the contract acts like a [dead man's switch](https://en.wikipedia.org/wiki/Dead_man%27s_switch).

A **user** can do several different interactions:

* Create a warrant canary. To do this he needs to:
  1. Define a time after which the warrant canary expires if the expiration time is not updated.
  2. Add a short description of the purpose of the warrant canary.
  3. Add a trusted third party if necessary. (wallet address).
* Update the timestamp to prove that a certain event did not happen yet.
* Move funds to the warrant canary.
* Update the time after which the warrant canary expires.
* Update the wallet address of the trusted third party.
* Remove funds from the warrant canary.
* Delete the warrant canary.

A **trusted third party** can: 
* Withdraw funds if the warrant canary has expired.
* Delete the warrant canary if it has expired.

The **general audience** can:
* Check if the warrant canary has expired and therefore know, that a certain event has happened 
* Add funds to any warrant canary.

The **owner** of the contract can:
* Pause the contract so no new warrant canaries can be created and no funds can be added to existing ones. Withdrawing and updating expiration is still possible.
* Withdraw excess funds, meaning funds that are not associated with a warrant canary. (This functionality is tested in the smart contract tests)
* Withdraw ERC-20 tokens which have been sent to the address accidentally. -> not implemented.


### Website

The websity is deployed using netlify: https://warrantcanary.netlify.app/

### Deployed Address

The contract is on rinkeby under:

[0x51f217fEFC94CBD21C9f36E120C07D5Ba6205849](https://rinkeby.etherscan.io/address/0x51f217fEFC94CBD21C9f36E120C07D5Ba6205849#code)


### Deployment

To rinkeby:
```
truffle migrate --reset --network rinkeby
```

Verify:
```
truffle run verify WarrantCanary --network rinkeby
```


### Gas optimizations with compiler optimizations disabled/enabled
```
·---------------------------|----------------------------|-------------| |---------------------------|--------------|
|  Solc version: 0.8.9      ·  Optimizer enabled: false  ·  Runs: 200  · ·  Optimizer enabled: true  ·  Runs: 1500  ·
····························|····························|·············| |···························|··············|
|  Methods
····························|··············|·············|·············| |·············|·············|··············|
|  Method                   ·  Min         ·  Max        ·  Avg        · ·  Min        ·  Max        ·  Avg         ·
····························|··············|·············|·············| |·············|·············|··············|
|  addFunds                 ·       46153  ·      46165  ·      46155  · ·      45490  ·      45502  ·       45492  ·
····························|··············|·············|·············| |·············|·············|··············|
|  changeTrustedThirdParty  ·       25648  ·      74309  ·      65147  · ·      24629  ·      72397  ·       63282  ·
····························|··············|·············|·············| |·············|·············|··············|
|  createWarrantCanary      ·      159181  ·     248012  ·     192104  · ·     156868  ·     245664  ·      189776  ·
····························|··············|·············|·············| |·············|·············|··············|
|  deleteWarrantCanary      ·       58554  ·      59873  ·      58994  · ·      57677  ·      59131  ·       58162  ·
····························|··············|·············|·············| |·············|·············|··············|
|  pauseContract            ·           -  ·          -  ·      30327  · ·          -  ·          -  ·       29880  ·
····························|··············|·············|·············| |·············|·············|··············|
|  renounceOwnership        ·           -  ·          -  ·      15549  · ·          -  ·          -  ·       14778  ·
····························|··············|·············|·············| |·············|·············|··············|
|  retrieveExcessFunds      ·           -  ·          -  ·      41300  · ·          -  ·          -  ·       39865  ·
····························|··············|·············|·············| |·············|·············|··············|
|  transferOwnership        ·           -  ·          -  ·      31265  · ·          -  ·          -  ·       30111  ·
····························|··············|·············|·············| |·············|·············|··············|
|  unpauseContract          ·           -  ·          -  ·      30412  · ·          -  ·          -  ·       29905  ·
····························|··············|·············|·············| |·············|·············|··············|
|  updateExpiration         ·       35979  ·      36003  ·      35991  · ·      35098  ·      35122  ·       35110  ·
····························|··············|·············|·············| |·············|·············|··············|
|  withdrawAllFunds         ·       27740  ·      31840  ·      28791  · ·      26825  ·      30925  ·       27856  ·
····························|··············|·············|·············| |·············|·············|··············|
|  withdrawSomeFunds        ·           -  ·          -  ·      40263  · ·          -  ·          -  ·       39287  ·
····························|··············|·············|·············| |·············|·············|··············|
|  Deployments              ·                                          · ·                                          ·
····························|··············|·············|·············| |·············|·············|··············|
|  WarrantCanary            ·           -  ·          -  ·    2896460  · ·          -  ·          -  ·     1797814  ·
·---------------------------|--------------|-------------|-------------| |-------------|-------------|--------------|
```
