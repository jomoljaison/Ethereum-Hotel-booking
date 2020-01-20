const Hotel = artifacts.require('./Hotel.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Hotel', ([deployer, seller, buyer]) => {
  let hotel

  beforeEach(async () => {
    hotel = await Hotel.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await hotel.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await hotel.name()
      assert.equal(name, 'hotel management')
    })
  })

  describe('rooms', async () => {
    let result, roomCount

    before(async () => {
      result = await hotel.createRoom('Room', web3.utils.toWei('1', 'Ether'), { from: seller })
      roomCount = await hotel.roomCount()
    })

    it('creates rooms', async () => {
      // SUCCESS
      assert.equal(roomCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), roomCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Room', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')

      // FAILURE: room must have a name
      await await hotel.createRoom('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: room must have a price
      await await hotel.createRoom('Room', 0, { from: seller }).should.be.rejected;
    })

    it('lists rooms', async () => {
      const room = await hotel.rooms(roomCount)
      assert.equal(room.id.toNumber(), roomCount.toNumber(), 'id is correct')
      assert.equal(room.name, 'Room', 'name is correct')
      assert.equal(room.price, '1000000000000000000', 'price is correct')
      assert.equal(room.owner, seller, 'owner is correct')
      assert.equal(room.purchased, false, 'purchased is correct')
    })

    it('sells rooms', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await hotel.purchaseRoom(roomCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), roomCount.toNumber(), 'id is correct')
      assert.equal(event.name, 'Room', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let price
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      const exepectedBalance = oldSellerBalance.add(price)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to buy a room that does not exist, i.e., room must have valid id
      await hotel.purchaseRoom(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await hotel.purchaseRoom(roomCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // FAILURE: Deployer tries to buy the room, i.e., room can't be purchased twice
      await hotel.purchaseRoom(roomCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await hotel.purchaseRoom(roomCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })
})