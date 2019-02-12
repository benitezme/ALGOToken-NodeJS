pragma solidity 0.4.24;

// File: openzeppelin-solidity/contracts/token/ERC20/IERC20.sol

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function transferFrom(address from, address to, uint256 value)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function transferFrom(address from, address to, uint256 value)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {

  /**
  * @dev Multiplies two numbers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b);

    return c;
  }

  /**
  * @dev Integer division of two numbers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b > 0); // Solidity only automatically asserts when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold

    return c;
  }

  /**
  * @dev Subtracts two numbers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    uint256 c = a - b;

    return c;
  }

  /**
  * @dev Adds two numbers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);

    return c;
  }

  /**
  * @dev Divides two numbers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }
}

// File: openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol

/**
 * @title SafeERC20
 * @dev Wrappers around ERC20 operations that throw on failure.
 * To use this library you can add a `using SafeERC20 for ERC20;` statement to your contract,
 * which allows you to call the safe operations as `token.safeTransfer(...)`, etc.
 */
library SafeERC20 {

  using SafeMath for uint256;

  function safeTransfer(
    IERC20 token,
    address to,
    uint256 value
  )
    internal
  {
    require(token.transfer(to, value));
  }

  function safeTransferFrom(
    IERC20 token,
    address from,
    address to,
    uint256 value
  )
    internal
  {
    require(token.transferFrom(from, to, value));
  }

  function safeApprove(
    IERC20 token,
    address spender,
    uint256 value
  )
    internal
  {
    // safeApprove should only be called when setting an initial allowance, 
    // or when resetting it to zero. To increase and decrease it, use 
    // 'safeIncreaseAllowance' and 'safeDecreaseAllowance'
    require((value == 0) || (token.allowance(msg.sender, spender) == 0));
    require(token.approve(spender, value));
  }

  function safeIncreaseAllowance(
    IERC20 token,
    address spender,
    uint256 value
  )
    internal
  {
    uint256 newAllowance = token.allowance(address(this), spender).add(value);
    require(token.approve(spender, newAllowance));
  }

  function safeDecreaseAllowance(
    IERC20 token,
    address spender,
    uint256 value
  )
    internal
  {
    uint256 newAllowance = token.allowance(address(this), spender).sub(value);
    require(token.approve(spender, newAllowance));
  }
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/IAlgoMiner.sol

contract IAlgoMiner {
    function isAlgoMiner() public pure returns (bool);
    function getMinerType() public view returns (uint8);
    function getCategory() public view returns (uint8);
    function getMiner() public view returns (address);
    function getReferral() public view returns (address);
    function isMining() public view returns (bool);
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/AlgoCommon.sol

contract AlgoCommon {

    uint256 internal constant TOKEN_FACTOR = 10 ** uint256(18);
    uint256 internal constant CAT_0_VALUE = 100000 * TOKEN_FACTOR;
    uint256 internal constant CAT_1_VALUE = 1000000 * TOKEN_FACTOR;
    uint256 internal constant CAT_2_VALUE = 2 * 1000000 * TOKEN_FACTOR;
    uint256 internal constant CAT_3_VALUE = 3 * 1000000 * TOKEN_FACTOR;
    uint256 internal constant CAT_4_VALUE = 4 * 1000000 * TOKEN_FACTOR;
    uint256 internal constant CAT_5_VALUE = 5 * 1000000 * TOKEN_FACTOR;

    function getCapacityByCategory(uint8 category) internal pure returns (uint256) {
        if(category == 0) {
            return CAT_0_VALUE;
        } else if(category == 1) {
            return CAT_1_VALUE;
        } else if(category == 2) {
            return CAT_2_VALUE;
        } else if(category == 3) {
            return CAT_3_VALUE;
        } else if(category == 4) {
            return CAT_4_VALUE;
        } else if(category == 5) {
            return CAT_5_VALUE;
        }
    }
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/Terminable.sol

contract Terminable {

    address internal _creator;
    bool internal _terminated;

    constructor() internal {
        _creator = msg.sender;
        _terminated = false;
    }

    modifier notTerminated() {
        require(!_terminated);
        _;
    }

    function _terminate() internal {
        _terminated = true;
    }
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/ERC20TokenHolder.sol

contract ERC20TokenHolder is Terminable {
    using SafeERC20 for IERC20;

    IERC20 internal _token;

    constructor(address tokenAddress) Terminable() internal {
        _token = IERC20(tokenAddress);
    }

    function _terminate() internal {
        uint256 currentBalance = _token.balanceOf(address(this));
        if(currentBalance > 0) {
            _token.safeTransfer(_creator, currentBalance);
        }
        Terminable._terminate();
    }
}

// File: openzeppelin-solidity/contracts/access/Roles.sol

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account) internal {
    require(account != address(0));
    require(!has(role, account));

    role.bearer[account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0));
    require(has(role, account));

    role.bearer[account] = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0));
    return role.bearer[account];
  }
}

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/AlgoCoreTeamRole.sol

contract AlgoCoreTeamRole {
    using Roles for Roles.Role;

    Roles.Role private _coreTeamMembers;

    constructor () internal {
        _addCoreTeam(msg.sender);
    }

    modifier onlyCoreTeam() {
        require(isCoreTeam(msg.sender));
        _;
    }

    function isCoreTeam(address account) public view returns (bool) {
        return _coreTeamMembers.has(account);
    }

    function addCoreTeam(address account) public onlyCoreTeam {
        _addCoreTeam(account);
    }

    function renounceCoreTeam() public {
        _removeCoreTeam(msg.sender);
    }

    function _addCoreTeam(address account) internal {
        _coreTeamMembers.add(account);
    }

    function _removeCoreTeam(address account) internal {
        _coreTeamMembers.remove(account);
    }
}

// File: contracts/core/AlgoPool.sol

contract AlgoPool is AlgoCommon, ERC20TokenHolder, AlgoCoreTeamRole {
    using SafeERC20 for IERC20;

    enum PoolType {
        MinerPool,
        ReferralPool
    }

    PoolType private _poolType;
    mapping(address => bool) _fundedMiners;

    constructor(PoolType poolType, address tokenAddress)
        ERC20TokenHolder(tokenAddress)
        AlgoCoreTeamRole()
        public {
        _poolType = poolType;
    }

    function transferToMiner(address minerAddress) public notTerminated onlyCoreTeam {
        require(!_fundedMiners[minerAddress]);

        IAlgoMiner algoMiner = IAlgoMiner(minerAddress);

        require(algoMiner.isAlgoMiner());

        uint8 minerCategory = algoMiner.getCategory();

        require(minerCategory >= 0 && minerCategory <= 5);

        uint256 value = getCapacityByCategory(minerCategory);

        // For referral pools only transfer the 10% of the category capacity.
        if(_poolType == PoolType.ReferralPool) {
            value = value * 10 / 100;
        }

        _fundedMiners[minerAddress] = true;
        _token.safeTransfer(minerAddress, value);
    }

    function terminate() public onlyCoreTeam {
        _terminate();
    }
}
