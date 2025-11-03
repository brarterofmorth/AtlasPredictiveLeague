// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { EthereumConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

contract AtlasPredictiveLeague is EthereumConfig {
    uint256 public constant MIN_ENTRY_FEE = 0.001 ether;

    struct League {
        bool exists;
        string leagueId;
        string title;
    }

    mapping(string => League) private leagues;
}
