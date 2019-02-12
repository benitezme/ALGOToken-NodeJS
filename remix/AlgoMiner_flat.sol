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

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/AlgoSystemRole.sol

contract AlgoSystemRole {
    using Roles for Roles.Role;

    Roles.Role private _systemMembers;

    constructor () internal {
        _addSystem(msg.sender);
    }

    modifier onlySystem() {
        require(isSystem(msg.sender));
        _;
    }

    function isSystem(address account) public view returns (bool) {
        return _systemMembers.has(account);
    }

    function addSystem(address account) public onlySystem {
        _addSystem(account);
    }

    function renounceSystem() public {
        _removeSystem(msg.sender);
    }

    function _addSystem(address account) internal {
        _systemMembers.add(account);
    }

    function _removeSystem(address account) internal {
        _systemMembers.remove(account);
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

// File: /Users/barrylow/Business/AdvancedAlgos/brand/ALGOToken-nodejs-client/contracts/core/AlgoSupervisorRole.sol

contract AlgoSupervisorRole {
    using Roles for Roles.Role;

    Roles.Role private _supervisors;

    constructor () internal {
        _addSupervisor(msg.sender);
    }

    modifier onlySupervisor() {
        require(isSupervisor(msg.sender));
        _;
    }

    function isSupervisor(address account) public view returns (bool) {
        return _supervisors.has(account);
    }

    function addSupervisor(address account) public onlySupervisor {
        _addSupervisor(account);
    }

    function renounceSupervisor() public {
        _removeSupervisor(msg.sender);
    }

    function _addSupervisor(address account) internal {
        _supervisors.add(account);
    }

    function _removeSupervisor(address account) internal {
        _supervisors.remove(account);
    }
}

// File: contracts/core/AlgoMiner.sol

contract AlgoMiner is AlgoCommon, ERC20TokenHolder, AlgoSystemRole, AlgoCoreTeamRole, AlgoSupervisorRole, IAlgoMiner {
    using SafeERC20 for IERC20;

    uint256 public constant DAYS_PER_YEAR = 365;

    enum MinerType {
        PoolBased,
        NonPoolBased
    }

    enum MinerState {
        Deactivated,
        Activated,
        Suspended,
        Stopped
    }

    MinerType private _minerType;
    uint8 private _category;
    address private _miner;
    address private _referral;

    MinerState private _state;
    bool private _mining;
    uint8 private _currentYear;
    uint16 private _currentDay;
    uint256 private _currentYearSupply;

    constructor(MinerType minerType, uint8 category, address minerAccountAddress, address referralAccountAddress, address tokenAddress)
        ERC20TokenHolder(tokenAddress)
        AlgoSystemRole()
        AlgoCoreTeamRole()
        AlgoSupervisorRole()
        public {

        require(category >= 0 && category <= 5);
        require(minerAccountAddress != address(0));

        if(minerType == MinerType.PoolBased) {
            require(referralAccountAddress != address(0));
        }

        _minerType = minerType;
        _category = category;
        _miner = minerAccountAddress;
        _referral = referralAccountAddress;
    }

    modifier onlyMiner() {
        require(msg.sender == _miner);
        _;
    }

    function activateMiner() public notTerminated onlyCoreTeam {
        require(_state == MinerState.Deactivated);

        if(_minerType == MinerType.PoolBased && _currentYearSupply == 0) {

            uint256 capacity = getCapacityByCategory(_category);
            uint256 expectedBalance = capacity + capacity * 10 / 100;

            uint256 currentBalance = _token.balanceOf(address(this));

            require(currentBalance == expectedBalance);

            _currentYearSupply = capacity / 2;
        }

        _state = MinerState.Activated;
    }

    function deactivateMiner() public notTerminated onlyCoreTeam {
        require(_state != MinerState.Deactivated);

        _state = MinerState.Deactivated;
        _mining = false;
    }

    function migrateMiner(address newMinerAddress) public onlyCoreTeam {
        require(_state == MinerState.Deactivated);

        _token.safeTransfer(newMinerAddress, _token.balanceOf(address(this)));
    }

    function pauseMining() public notTerminated onlySupervisor {
        require(_state == MinerState.Activated);

        _state = MinerState.Suspended;
    }

    function resumeMining() public notTerminated onlySupervisor {
        require(_state == MinerState.Suspended);

        _state = MinerState.Activated;
    }

    function stopAndRemoveOwnership() public notTerminated onlySupervisor {
        require(_state != MinerState.Stopped);

        _state = MinerState.Stopped;
        _mining = false;
        _miner = address(0);
        _referral = address(0);
    }

    function resetMiner(address newOwnerAddress, address newReferralAddress) public notTerminated onlySupervisor {
        require(_state == MinerState.Stopped);

        _state = MinerState.Activated;
        _miner = newOwnerAddress;
        _referral = newReferralAddress;
    }

    function startMining() public notTerminated onlyMiner {
        require(_state == MinerState.Activated);
        require(!_mining);

        _mining = true;
    }

    function stopMining() public notTerminated onlyMiner {
        require(_state == MinerState.Activated);
        require(_mining);

        _mining = false;
    }

    function mine() public notTerminated onlySystem {
        require(_minerType == MinerType.PoolBased);
        require(_state == MinerState.Activated);
        require(_mining);

        if(_currentDay == 0) {
            _currentYear = 1;
            _currentDay = 1;
        } else {
            _currentDay++;
            if(_currentDay == (DAYS_PER_YEAR + 1)) {
                _currentYear++;
                _currentDay = 1;
                _currentYearSupply = _currentYearSupply / 2;
            }
        }

        uint256 minerTokens = _currentYearSupply / DAYS_PER_YEAR;
        uint256 referralTokens = minerTokens * 10 / 100;

        require(minerTokens > 0);
        require(referralTokens > 0);

        _token.safeTransfer(_miner, minerTokens);
        _token.safeTransfer(_referral, referralTokens);
    }

    function terminate() public onlyCoreTeam {
        _terminate();
    }

    function isAlgoMiner() public pure returns (bool) {
        return true;
    }

    function getMinerType() public view returns (uint8) {
        return uint8(_minerType);
    }

    function getCategory() public view returns (uint8) {
        return _category;
    }

    function getMiner() public view returns (address) {
        return _miner;
    }

    function getReferral() public view returns (address) {
        return _referral;
    }

    function isMining() public view returns (bool) {
        return _state == MinerState.Activated && _mining;
    }

    function getCurrentYear() public view returns (uint8) {
        return _currentYear;
    }

    function getCurrentDay() public view returns (uint16) {
        return _currentDay;
    }

    function getCurrentYearSupply() public view returns (uint256) {
        return _currentYearSupply;
    }
}
