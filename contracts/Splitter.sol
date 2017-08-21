pragma solidity ^0.4.1;

contract Splitter {
    address public owner;
    address[] public users;
    uint public balance;
    
    function Splitter(address user1, address user2) {
        owner = msg.sender;
        if(user1 == 0 || user2 == 0) throw;
        users.push(msg.sender);
        users.push(user1);
        users.push(user2);
        balance = 0;
    }
    
    function contribute()
        public
        payable
        returns (bool success)
    {
        if(msg.value <= 1) throw;
        if(msg.sender == owner)
        {
            uint toSend = msg.value;
            toSend = toSend % 2 === 0 ? toSend : toSend - 1; 

            if(!users[0].send(msg.value/2)) throw;
            if(!users[1].send(msg.value/2)) throw;
            if(toSend < msg.value && !users[1].send(msg.value/2)) throw;
            return true;
        }
        
        balance += msg.value;
        return true;
    }
    
    /**
     * user: possible values: 1-3
     * 
     */
    function getBalance(uint user) returns (uint)
    {
        if(user < 0 || user >= 3) throw;
        return users[user].balance;
    }
    
    function kill()
    {
        if(msg.sender == owner)
        suicide(owner);
    }
}