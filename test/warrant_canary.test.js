const WarrantCanary = artifacts.require("WarrantCanary");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("WarrantCanary", function (accounts) {

  let instance;
  let createTx;
  const purpose = "test the contract."
  const expirationBlock = 111;

  beforeEach(async () => {
    instance = await WarrantCanary.new();
    createTx = await instance.createWarrantCanarySimple(expirationBlock, purpose);

  });

  describe("Create warrant canary contract.", () => {
    it("should emit a Log and store all elements correctly when a simple contract is created.", async () => {
      let eventEmitted = false;

      console.log("first log: " + createTx.logs[0]);
      if (createTx.logs[0].event == "LogCreated") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "creating a warrant canary should emit a Created event",
      );

      const result = await instance.warrantCanaries.call(0);
      console.log("Purpose: " + result.purpose);

      assert.equal(
        result.purpose,
        purpose,
        "The purpose is not stored correctly",
      );
      assert.equal(
        result.expirationBlock,
        expirationBlock,
        "The expirationBlock is not stored properly.",
      );
      assert.equal(
        result.warrantCanaryOwner,
        accounts[0],
        "The owner of the warrant Canary is not set properly",
      );
    });
    it("should emit a Log when funds are withdrawn", async () => {
      let eventEmitted = false;
      const purpose = "test the contract."
      const expirationBlock = 111;
      await instance.createWarrantCanarySimple(expirationBlock, purpose);

      const addFundsTx = await instance.addFunds(0, {value: 250});

      const withdrawTx = await instance.withdrawSomeFunds(0, 200);

      // console.log("test: " + withdrawTx.logs[0].event);

      if (withdrawTx.logs[0].event == "LogFundsWithdrawn") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "Withdrawing funds should emit an event",
      );

      // const result = await instance.warrantCanaries.call(0);
      // console.log(result.purpose);
    });
  });

});
