import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { parseAbi, zeroAddress } from 'viem';
import { mainnet } from "wagmi/chains";
import { publicClient, wagmiConfig } from '../components/wallet'; // <-- make sure publicClient is viem Client

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
  'function SUBSIDY_HALVING_INTERVAL() view returns (uint32)',

  'function buyPizza(uint256) external',
  'function sellPizza(uint256) external',
  'function mine(uint256) external',
  'function changePizza(uint256, uint256) external',

  'function subsidyOf(uint256) view returns (uint256)',
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

export async function getVBTCBalance(address: `0x${string}`): Promise<bigint> {
  const target = address;
  return await publicClient.readContract({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'balanceOf',
    args: [target]
  });
}

export async function getMyPizzaCount(owner: `0x${string}`): Promise<bigint> {
  const total = await getTotalPizzas();

  const calls = Array.from({ length: Number(total) }, (_, idx) => ({
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

export async function getMyPizzas(owner: `0x${string}`): Promise<Pizza[]> {
  const total = await getTotalPizzas();

  const calls = Array.from({ length: Number(total) }, (_, idx) => ({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'pizzas',
    args: [BigInt(idx)]
  }));

  const pizzaResults = await publicClient.multicall({
    contracts: calls,
    allowFailure: false
  });

  // 내가 가진 피자들의 인덱스를 먼저 추려냄
  const myPizzaIndices: number[] = [];
  const myPizzaTuples: [string, bigint, bigint][] = [];

  pizzaResults.forEach((res, idx) => {
    const tuple = res as unknown as [string, bigint, bigint];
    if (tuple[0]?.toLowerCase() === owner.toLowerCase()) {
      myPizzaIndices.push(idx);
      myPizzaTuples.push(tuple);
    }
  });

  if (myPizzaIndices.length === 0) return [];

  // 나의 피자들에 대해 subsidyOf를 동시에 요청
  const subsidyCalls = myPizzaIndices.map(idx => ({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'subsidyOf',
    args: [BigInt(idx)]
  }));

  const subsidies = await publicClient.multicall({
    contracts: subsidyCalls,
    allowFailure: false
  });

  const pizzas: Pizza[] = myPizzaTuples.map((tuple, i) => ({
    id: myPizzaIndices[i],
    owner: tuple[0],
    power: tuple[1],
    subsidy: subsidies[i] as bigint,
  }));

  return pizzas;
}

type Pizza = {
  id: number;
  owner: string;
  power: bigint;
  subsidy: bigint;
};

export async function getAllPizzas(): Promise<Pizza[]> {
  const total = await getTotalPizzas();

  const calls = Array.from({ length: Number(total) }, (_, idx) => ({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'pizzas',
    args: [BigInt(idx)]
  }));

  const pizzaResults = await publicClient.multicall({
    contracts: calls,
    allowFailure: false
  });

  // 유효한 피자만 필터링
  const validIndices: number[] = [];
  const validTuples: [string, bigint, bigint][] = [];

  pizzaResults.forEach((res, idx) => {
    const tuple = res as unknown as [string, bigint, bigint];
    if (tuple[0] !== zeroAddress) {
      validIndices.push(idx);
      validTuples.push(tuple);
    }
  });

  if (validIndices.length === 0) return [];

  const subsidyCalls = validIndices.map(idx => ({
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'subsidyOf',
    args: [BigInt(idx)]
  }));

  const subsidies = await publicClient.multicall({
    contracts: subsidyCalls,
    allowFailure: false
  });

  const pizzas: Pizza[] = validTuples.map((tuple, i) => ({
    id: validIndices[i],
    owner: tuple[0],
    power: tuple[1],
    subsidy: subsidies[i] as bigint,
  }));

  return pizzas;
}

export async function buyPizza(power: bigint) {
  const txHash = await writeContract(wagmiConfig, {
    chainId: mainnet.id,
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'buyPizza',
    args: [power],
  });

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash });
}

export async function sellPizza(pizzaId: bigint) {
  const txHash = await writeContract(wagmiConfig, {
    chainId: mainnet.id,
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'sellPizza',
    args: [pizzaId],
  });

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash });
}

export async function minePizza(pizzaId: bigint) {
  const txHash = await writeContract(wagmiConfig, {
    chainId: mainnet.id,
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'mine',
    args: [pizzaId],
  });

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash });
}

export async function changePizza(pizzaId: bigint, power: bigint) {
  const txHash = await writeContract(wagmiConfig, {
    chainId: mainnet.id,
    address: VBTC_ADDRESS,
    abi: VBTC_ABI,
    functionName: 'changePizza',
    args: [pizzaId, power],
  });

  await waitForTransactionReceipt(wagmiConfig, { hash: txHash });
}
