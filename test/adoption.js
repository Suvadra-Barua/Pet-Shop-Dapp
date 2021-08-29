const adoption = artifacts.require("adoption");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("adoption", function (accounts) {
  describe('pet shop test group', () => {
    let instance;
    before(async () => {
      instance=await adoption.deployed();
    });

    it('User should adopt a pet',async ()=>{
      await instance.adopt.sendTransaction(3,{from: accounts[0]});
      let adopter=await instance.petAdopters.call(3);
      assert.equal(adopter, accounts[0], "Wrong pet owner error");
    });

    it('Who is the owner of that pet?',async()=>{
      let petAdopters=await instance.getAdopters.call();
      assert.equal(petAdopters[3], accounts[0], "The address is not the owner");
    })

    it('Should throw error for invalid pet address', async() =>{
      try{
        await instance.adopt.sendTransaction(100,{from: accounts[0]});
        assert.fail(True, False, "This is not the purpose of the function: should use petid>15");
      }
      catch(error){
        assert.include(String(error),"revert",'Expected got "revert" but instead got '+error);
      }
    });
  });
});
