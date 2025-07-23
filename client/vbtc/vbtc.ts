import { parseAbi, zeroAddress } from 'viem';
import { publicClient } from '../components/wallet'; // <-- make sure publicClient is viem Client

export const VBTC_ADDRESS = '0x84e7AE4897B3847B67f212Aff78BFbC5f700aa40' as const;

const DECIMALS = 8n;          // solidity constant

const VBTC_ABI = parseAbi([
  // ERC‑20
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  // Pizza helpers
  'function pizzaCount() view returns (uint256)',
  'function pizzas(uint256) view returns (address owner, uint256 power, uint256 accSubsidy)',

  // You already had these
  'function genesisEthBlock() view returns (uint256)',
  'function SUBSIDY_HALVING_INTERVAL() view returns (uint32)'
]);

export async function getBlocksUntilNextHalving() {
  const [genesisBlock, halvingInterval] = await Promise.all([
    publicClient.readContract({
      address: VBTC_ADDRESS,
      abi: VBTC_ABI,
      functionName: 'genesisEthBlock'
    }),
    publicClient.readContract({
      address: VBTC_ADDRESS,
      abi: VBTC_ABI,
      functionName: 'SUBSIDY_HALVING_INTERVAL'
    })
  ]);

  const { number: currentBlock } = await publicClient.getBlock();

  const blocksSinceGenesis = BigInt(currentBlock) - BigInt(genesisBlock);
  const currentEra = blocksSinceGenesis / BigInt(halvingInterval);
  const nextHalvingBlock = BigInt(genesisBlock) + BigInt(halvingInterval) * (currentEra + 1n);
  const blocksRemaining = nextHalvingBlock - BigInt(currentBlock);

  const minutesRemaining = Number(blocksRemaining) * 10;
  const daysRemaining = Math.ceil(minutesRemaining / 60 / 24);

  return {
    nextHalvingBlock,
    blocksRemaining,
    daysRemaining
  };
}

export async function getVBTCTotalSupply(): Promise<bigint> {
  return await publicClient.readContract({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'totalSupply'
  });
}

export async function getTotalPizzas(): Promise<bigint> {
  return await publicClient.readContract({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'pizzaCount'
  });
}

export async function getVBTCBalance(
  address: `0x${string}` | undefined
): Promise<bigint> {
  if (!address) return 0n;

  const target = address;
  return await publicClient.readContract({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'balanceOf',
    args: [target]
  });
}

export async function getMyPizzas(
  owner: `0x${string}` | undefined,
  maxScan: number = 5_000
): Promise<bigint> {
  if (!owner) return 0n;

  const total = await getTotalPizzas();
  const last = Number(total < BigInt(maxScan) ? total : BigInt(maxScan));

  const calls = Array.from({ length: last }, (_, idx) => ({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'pizzas',
    args: [BigInt(idx)]
  }));

  const results = await publicClient.multicall({
    contracts: calls,
    allowFailure: false
  });

  let held = 0n;

  for (const res of results) {
    const tuple = res as unknown as [string, bigint, bigint];
    const pizzaOwner = tuple[0];

    if (pizzaOwner?.toLowerCase() === owner.toLowerCase()) {
      held++;
    }
  }

  return held;
}
