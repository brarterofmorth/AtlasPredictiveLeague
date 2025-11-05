import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ATLAS_PREDICTIVE_LEAGUE_ADDRESS, ATLAS_PREDICTIVE_LEAGUE_ABI } from "@/config/contracts";
import { toast } from "sonner";
import { useEffect } from "react";

const SEPOLIA_EXPLORER = "https://sepolia.etherscan.io/tx/";

// Read all leagues
export const useListLeagues = () => {
  return useReadContract({
    address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
    abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
    functionName: "listLeagues"
  });
};

// Read league details
export const useGetLeague = (leagueId: string | undefined) => {
  return useReadContract({
    address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
    abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
    functionName: "getLeague",
    args: leagueId ? [leagueId] : undefined,
    query: {
      enabled: !!leagueId
    }
  });
};

// Read league options
export const useGetOptions = (leagueId: string | undefined) => {
  return useReadContract({
    address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
    abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
    functionName: "getOptions",
    args: leagueId ? [leagueId] : undefined,
    query: {
      enabled: !!leagueId
    }
  });
};

// Read pick counts
export const useGetPickCounts = (leagueId: string | undefined) => {
  return useReadContract({
    address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
    abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
    functionName: "getPickCounts",
    args: leagueId ? [leagueId] : undefined,
    query: {
      enabled: !!leagueId
    }
  });
};

// Read proposal
export const useGetProposal = (leagueId: string | undefined) => {
  return useReadContract({
    address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
    abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
    functionName: "getProposal",
    args: leagueId ? [leagueId] : undefined,
    query: {
      enabled: !!leagueId
    }
  });
};

// Write: Enter league
export const useEnterLeague = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `Transaction confirmed! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const enterLeague = async (
    leagueId: string,
    optionId: number,
    encryptedWeight: `0x${string}`,
    proof: `0x${string}`,
    entryFee: bigint
  ) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "enterLeague",
        args: [leagueId, optionId, encryptedWeight, proof],
        value: entryFee
      });
    } catch (err) {
      toast.error("Failed to enter league");
      throw err;
    }
  };

  return { enterLeague, hash, error, isPending, isConfirming, isSuccess };
};

// Write: Propose result
export const useProposeResult = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `Result proposed successfully! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const proposeResult = async (leagueId: string, winningOption: number, challengeBond: bigint) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "proposeResult",
        args: [leagueId, winningOption],
        value: challengeBond
      });
    } catch (err) {
      toast.error("Failed to propose result");
      throw err;
    }
  };

  return { proposeResult, hash, error, isPending, isConfirming, isSuccess };
};

// Write: Challenge result
export const useChallengeResult = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `Challenge submitted successfully! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const challengeResult = async (leagueId: string, correctOption: number, challengeBond: bigint) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "challengeResult",
        args: [leagueId, correctOption],
        value: challengeBond
      });
    } catch (err) {
      toast.error("Failed to challenge result");
      throw err;
    }
  };

  return { challengeResult, hash, error, isPending, isConfirming, isSuccess };
};

// Write: Finalize result
export const useFinalizeResult = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `Result finalized successfully! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const finalizeResult = async (leagueId: string) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "finalizeResult",
        args: [leagueId]
      });
    } catch (err) {
      toast.error("Failed to finalize result");
      throw err;
    }
  };

  return { finalizeResult, hash, error, isPending, isConfirming, isSuccess };
};

// Write: Claim prize
export const useClaimPrize = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `Prize claimed successfully! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const claimPrize = async (leagueId: string) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "claimPrize",
        args: [leagueId]
      });
    } catch (err) {
      toast.error("Failed to claim prize");
      throw err;
    }
  };

  return { claimPrize, hash, error, isPending, isConfirming, isSuccess };
};

// Write: Create league
export const useCreateLeague = () => {
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isSuccess && hash) {
      toast.success(
        `League created successfully! View on Etherscan: ${SEPOLIA_EXPLORER}${hash}`,
        {
          duration: 5000,
          action: {
            label: "View",
            onClick: () => window.open(`${SEPOLIA_EXPLORER}${hash}`, "_blank")
          }
        }
      );
    }
  }, [isSuccess, hash]);

  const createLeague = async (
    leagueId: string,
    title: string,
    options: string[],
    entryFee: bigint,
    duration: bigint
  ) => {
    try {
      writeContract({
        address: ATLAS_PREDICTIVE_LEAGUE_ADDRESS,
        abi: ATLAS_PREDICTIVE_LEAGUE_ABI,
        functionName: "createLeague",
        args: [leagueId, title, options, entryFee, duration]
      });
    } catch (err) {
      toast.error("Failed to create league");
      throw err;
    }
  };

  return { createLeague, hash, error, isPending, isConfirming, isSuccess };
};
