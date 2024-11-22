export const BootcampFactoryAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "ADMIN",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "DEFAULT_ADMIN_ROLE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "MANAGER",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "createBootcamp",
    inputs: [
      {
        name: "_depositAmount",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "_depositToken",
        type: "address",
        internalType: "address"
      },
      {
        name: "_bootcampStart",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "_bootcampDeadline",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "_withdrawDuration",
        type: "uint256",
        internalType: "uint256"
      },
      { name: "_bootcampName", type: "string", internalType: "string" }
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "getRoleAdmin",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" }
    ],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "grantRole",
    inputs: [
      { name: "_role", type: "bytes32", internalType: "bytes32" },
      { name: "_account", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "hasRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isBootcamp",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "renounceRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" },
      {
        name: "callerConfirmation",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "revokeRole",
    inputs: [
      { name: "_role", type: "bytes32", internalType: "bytes32" },
      { name: "_account", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      { name: "interfaceId", type: "bytes4", internalType: "bytes4" }
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "withdrawProfit",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_bootcamp", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "AdminFundsWithdrawn",
    inputs: [
      {
        name: "admin",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "withdrawnAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "remainedBalance",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "BootcampCreated",
    inputs: [
      {
        name: "bootcampAddress",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleAdminChanged",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "previousAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "newAdminRole",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleGranted",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "RoleRevoked",
    inputs: [
      {
        name: "role",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32"
      },
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  { type: "error", name: "AccessControlBadConfirmation", inputs: [] },
  {
    type: "error",
    name: "AccessControlUnauthorizedAccount",
    inputs: [
      { name: "account", type: "address", internalType: "address" },
      { name: "neededRole", type: "bytes32", internalType: "bytes32" }
    ]
  },
  {
    type: "error",
    name: "BootcampFactory__CanNotUpdateRoleForZeroAddress",
    inputs: []
  },
  {
    type: "error",
    name: "BootcampFactory__DepositTokenCanNotBeZeroAddress",
    inputs: []
  },
  {
    type: "error",
    name: "BootcampFactory__InvalidBootcampAddress",
    inputs: []
  },
  {
    type: "error",
    name: "BootcampFactory__InvalidBootcampStartOrDedlineTime",
    inputs: []
  },
  {
    type: "error",
    name: "BootcampFactory__UpdateNonExistentRole",
    inputs: [
      { name: "role", type: "bytes32", internalType: "bytes32" }
    ]
  }
] as const;
