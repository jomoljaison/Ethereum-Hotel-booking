pragma solidity ^0.5.0;

contract Hotel {
    string public name;
    uint public roomCount = 0;
    mapping(uint => Room) public rooms;

    struct Room {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event RoomCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event RoomPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "hotel management";
    }

    function createRoom(string memory _name, uint _price) public {     
        require(bytes(_name).length > 0);      
        require(_price > 0);      
        roomCount ++;       
        rooms[roomCount] = Room(roomCount, _name, _price, msg.sender, false);       
        emit RoomCreated(roomCount, _name, _price, msg.sender, false);
    }

    function purchaseRoom(uint _id) public payable { 
        Room memory _room = rooms[_id]; 
        address payable _seller = _room.owner; 
        require(_room.id > 0 && _room.id <= roomCount);       
        require(msg.value >= _room.price);
        require(!_room.purchased);
        require(_seller != msg.sender);
        _room.owner = msg.sender;
        _room.purchased = true;
        rooms[_id] = _room;

        address(_seller).transfer(msg.value);

        emit RoomPurchased(roomCount, _room.name, _room.price, msg.sender, true);
    }
}
