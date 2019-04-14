pragma solidity ^0.4.25;

contract ERC20 {
    // State properties
    enum StateType { Initialized, Operational, Terminated }
    address public Administrator;
    string public TokenName;
    string public TokenSymbol;
    uint256 public TotalSupply;
    uint256 public CirculatingSupply;
    StateType public State;

    // This creates an array with all balances
    mapping(address => uint256) public balanceOf;

    // This is a type for a single user
    struct User {
        address user;     // The address of an user
        uint256 amount;   // The number of tokens an user has
    }

    // A dynamically-sized array of 'User' structs
    User[] public users;

    /**
    * Initialize contract
    *
    * Initializes contract with initial supply tokens to the creator of the contract
    *
    * @param supply Initial token supply
    * @param token Name of the token
    * @param symbol Symbol of the token
    */
    constructor(uint256 supply, string token, string symbol) public {
        Administrator = msg.sender;
        TokenName = token;                  // Set the name for display purposes
        TokenSymbol = symbol;               // Set the symbol for display purposes
        TotalSupply = supply;               // Update total supply
        balanceOf[msg.sender] = supply;     // Give the creator all initial tokens
        State = StateType.Initialized;
    }

    /**
    * Transfer tokens to another user
    *
    * Send `value` tokens to `to` from your account
    *
    * @param to The address of the recipient
    * @param value the amount to send
    */
    function Transfer(address to, uint256 value) public {
        if (State == StateType.Terminated)
        {
            revert();
        }

        _Transfer(msg.sender, to, value);
        State = StateType.Operational;
    }

    /**
     * Transfer tokens from other address
     *
     * Send `_value` tokens to `_to` on behalf of `_from`
     *
     * @param from The address of the sender
     * @param to The address of the recipient
     * @param value the amount to send
     */
    function TransferFrom(address from, address to, uint256 value) public {
        if (State == StateType.Terminated)
        {
            revert();
        }

        _Transfer(from, to, value);
        State = StateType.Operational;
    }

    /**
    * Terminate contract
    *
    * Terminates the contract and make actions impossible
    *
    */
    function Terminate() public {
        if (Administrator != msg.sender)
        {
            revert();
        }

        State = StateType.Terminated;
    }

    /**
     * Internal transfer, only can be called by this contract
     */
    function _Transfer(address from, address to, uint value) internal {
        // Prevent transfer to 0x0 address. Use burn() instead
        require(to != 0x0);
        // Check if the sender has enough
        require(balanceOf[from] >= value);
        // Check for overflows
        require(balanceOf[to] + value >= balanceOf[to]);

        // Save this for an assertion in the future
        uint previousBalances = balanceOf[from] + balanceOf[to];
        // Subtract from the sender
        balanceOf[from] -= value;
        // Add the same to the recipient
        balanceOf[to] += value;

        // Asserts are used to use static analysis to find bugs in your code. They should never fail
        assert(balanceOf[from] + balanceOf[to] == previousBalances);

        // Update the circulating supply if tokens come out of the initial wallet
        if (from == Administrator) {
            CirculatingSupply += value;
        }
        if (to == Administrator) {
            CirculatingSupply -= value;
        }
    }

    /**
     * Get token balance of a user
     *
     * Gets the balance of the sender
     *
     */
    function GetUserBalance() public view returns (uint256 balance) {
        balance = balanceOf[msg.sender];
        return balance;
    }
}