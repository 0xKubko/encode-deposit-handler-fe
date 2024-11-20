export const DepositHandlerAbi = [
  {
    type: "constructor",
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
      { name: "_manager", type: "address", internalType: "address" },
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
      { name: "_factory", type: "address", internalType: "address" },
      { name: "_bootcampName", type: "string", internalType: "string" }
    ],
    stateMutability: "nonpayable"
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
    name: "bootcampDeadline",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "bootcampName",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "bootcampStart",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_depositor", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "depositAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "depositToken",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract IERC20" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "deposits",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [
      {
        name: "depositedAmount",
        type: "uint256",
        internalType: "uint256"
      },
      { name: "depositDonation", type: "bool", internalType: "bool" },
      {
        name: "status",
        type: "uint8",
        internalType: "enum DepositHandler.Status"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "donate",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "emergencyWithdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "emergencyWithdrawParticipants",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "exceptionalWithdraw",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      {
        name: "_participant",
        type: "address",
        internalType: "address"
      },
      {
        name: "_status",
        type: "uint8",
        internalType: "enum DepositHandler.Status"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
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
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" }
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
    name: "isParticipant",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
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
      { name: "role", type: "bytes32", internalType: "bytes32" },
      { name: "account", type: "address", internalType: "address" }
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
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateStatusBatch",
    inputs: [
      {
        name: "_participants",
        type: "address[]",
        internalType: "address[]"
      },
      {
        name: "_status",
        type: "uint8",
        internalType: "enum DepositHandler.Status"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "_amount", type: "uint256", internalType: "uint256" },
      { name: "_depositor", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawAdmin",
    inputs: [
      { name: "_admin", type: "address", internalType: "address" },
      { name: "_amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawDuration",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "DepositDone",
    inputs: [
      {
        name: "depositor",
        type: "address",
        indexed: false,
        internalType: "address"
      },
      {
        name: "depositAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DepositWithdrawn",
    inputs: [
      {
        name: "depositor",
        type: "address",
        indexed: false,
        internalType: "address"
      },
      {
        name: "withdrawAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
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
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
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
    name: "DepositHandler__ApprovedAmountLessThanDeposit",
    inputs: [
      {
        name: "_approvedAmount",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "error",
    name: "DepositHandler__BootcampIsNotYetFinished",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__CallerNotAFactoryContract",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__CallerNotParticipant",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__DepositingStageAlreadyClosed",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__IncorrectAmountForWithdrawal",
    inputs: [
      {
        name: "_withdrawAmount",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "error",
    name: "DepositHandler__IncorrectDepositedAmount",
    inputs: [
      {
        name: "_actualAmount",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "expectedAmount",
        type: "uint256",
        internalType: "uint256"
      }
    ]
  },
  {
    type: "error",
    name: "DepositHandler__NotAllowedActionWithYourStatus",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__ParticipantsArraySizeIsZero",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__UserAddressCanNotBeZero",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__WithdrawStageAlreadyClosed",
    inputs: []
  },
  {
    type: "error",
    name: "DepositHandler__WithdrawStageNotClosed",
    inputs: []
  },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      { name: "token", type: "address", internalType: "address" }
    ]
  }
] as const;
