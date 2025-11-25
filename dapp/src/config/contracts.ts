import type { Address } from "viem";

const defaultAddress = "0x0000000000000000000000000000000000000000";
const envAddress = import.meta.env.VITE_ATLAS_PREDICTIVE_LEAGUE_ADDRESS;

export const ATLAS_PREDICTIVE_LEAGUE_ADDRESS: Address = (envAddress || defaultAddress) as Address;

export const ATLAS_PREDICTIVE_LEAGUE_ABI = [
  // ========== CONSTANTS ==========
  {
    type: "function",
    name: "MIN_ENTRY_FEE",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "CHALLENGE_BOND",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "CHALLENGE_PERIOD",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "PUSH_SENTINEL",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }]
  },

  // ========== READ FUNCTIONS ==========
  {
    type: "function",
    name: "getLeague",
    stateMutability: "view",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: [
      { name: "title", type: "string" },
      { name: "entryFee", type: "uint256" },
      { name: "lockTime", type: "uint256" },
      { name: "prizePool", type: "uint256" },
      { name: "cancelled", type: "bool" },
      { name: "settled", type: "bool" },
      { name: "winningOption", type: "uint8" }
    ]
  },
  {
    type: "function",
    name: "getOptions",
    stateMutability: "view",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: [{ name: "", type: "string[]" }]
  },
  {
    type: "function",
    name: "getPickCounts",
    stateMutability: "view",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: [{ name: "pickCounts", type: "uint256[]" }]
  },
  {
    type: "function",
    name: "getProposal",
    stateMutability: "view",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: [
      { name: "proposer", type: "address" },
      { name: "proposedOption", type: "uint8" },
      { name: "bondAmount", type: "uint256" },
      { name: "proposeTime", type: "uint256" },
      { name: "challenged", type: "bool" },
      { name: "finalized", type: "bool" }
    ]
  },
  {
    type: "function",
    name: "getChallenges",
    stateMutability: "view",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: [
      { name: "challengers", type: "address[]" },
      { name: "options", type: "uint8[]" },
      { name: "bonds", type: "uint256[]" },
      { name: "times", type: "uint256[]" }
    ]
  },
  {
    type: "function",
    name: "listLeagues",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "string[]" }]
  },

  // ========== WRITE FUNCTIONS ==========
  {
    type: "function",
    name: "createLeague",
    stateMutability: "nonpayable",
    inputs: [
      { name: "leagueId", type: "string" },
      { name: "title", type: "string" },
      { name: "options", type: "string[]" },
      { name: "entryFee", type: "uint256" },
      { name: "duration", type: "uint256" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "enterLeague",
    stateMutability: "payable",
    inputs: [
      { name: "leagueId", type: "string" },
      { name: "optionId", type: "uint8" },
      { name: "encryptedWeight", type: "bytes32" },
      { name: "proof", type: "bytes" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "editEntry",
    stateMutability: "nonpayable",
    inputs: [
      { name: "leagueId", type: "string" },
      { name: "newOptionId", type: "uint8" },
      { name: "newEncryptedWeight", type: "bytes32" },
      { name: "proof", type: "bytes" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "proposeResult",
    stateMutability: "payable",
    inputs: [
      { name: "leagueId", type: "string" },
      { name: "winningOption", type: "uint8" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "challengeResult",
    stateMutability: "payable",
    inputs: [
      { name: "leagueId", type: "string" },
      { name: "correctOption", type: "uint8" }
    ],
    outputs: []
  },
  {
    type: "function",
    name: "finalizeResult",
    stateMutability: "nonpayable",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: []
  },
  {
    type: "function",
    name: "cancelLeague",
    stateMutability: "payable",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: []
  },
  {
    type: "function",
    name: "claimPrize",
    stateMutability: "nonpayable",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: []
  },
  {
    type: "function",
    name: "claimRefund",
    stateMutability: "nonpayable",
    inputs: [{ name: "leagueId", type: "string" }],
    outputs: []
  },

  // ========== EVENTS ==========
  {
    type: "event",
    name: "LeagueCreated",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "entryFee", type: "uint256", indexed: false },
      { name: "lockTime", type: "uint256", indexed: false }
    ]
  },
  {
    type: "event",
    name: "EntrySubmitted",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "user", type: "address", indexed: true },
      { name: "optionId", type: "uint8", indexed: false }
    ]
  },
  {
    type: "event",
    name: "ResultProposed",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "proposer", type: "address", indexed: true },
      { name: "option", type: "uint8", indexed: false }
    ]
  },
  {
    type: "event",
    name: "ResultChallenged",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "challenger", type: "address", indexed: true },
      { name: "option", type: "uint8", indexed: false }
    ]
  },
  {
    type: "event",
    name: "ResultFinalized",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "winningOption", type: "uint8", indexed: false }
    ]
  },
  {
    type: "event",
    name: "PrizeClaimed",
    inputs: [
      { name: "leagueId", type: "string", indexed: true },
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false }
    ]
  }
] as const;
