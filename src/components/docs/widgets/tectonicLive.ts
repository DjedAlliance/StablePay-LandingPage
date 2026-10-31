'use client'
import { useCallback, useEffect, useState } from 'react'

export const SEPOLIA = {
  rpc: 'https://ethereum-sepolia-rpc.publicnode.com',
  tectonic: '0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1',
  explorer: 'https://sepolia.etherscan.io/address/0xea262fB18992ddE398a5b6fa7A4F879FfB262aC1',
}

export const D = BigInt('1000000000000000000')
export const ONE = BigInt(1)
export const ZERO = BigInt(0)
export const SUPER_CRITICAL = 1.05
export const CRITICAL = 1.1
export const SAFE = 1.5
export const MAX_DAILY_FEE = 0.000548

const SELECTORS = {
  ratio: '0x71ca337d',
  scPriceMint: '0x7c9189f6',
  fee: '0xddca3f43',
  devFee: '0x6827e764',
  reserve: '0x4980e1be',
  liabilities: '0x9f13f76d',
  totalSupply: '0x18160ddd',
  stabilityFee: '0x361416e1',
} as const

export type LiveState = { [K in keyof typeof SELECTORS]: bigint } & { fetchedAt: Date }

let inflight: Promise<LiveState> | null = null
let lastValue: { at: number; value: LiveState } | null = null

async function fetchLive(): Promise<LiveState> {
  const entries = Object.entries(SELECTORS)
  const response = await fetch(SEPOLIA.rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      entries.map(([, data], id) => ({
        jsonrpc: '2.0',
        id,
        method: 'eth_call',
        params: [{ to: SEPOLIA.tectonic, data }, 'latest'],
      }))
    ),
  })
  if (!response.ok) throw new Error(`RPC responded ${response.status}`)
  const results: { id: number; result?: string; error?: unknown }[] = await response.json()
  const value = { fetchedAt: new Date() } as LiveState
  for (const result of results) {
    if (!result.result || result.error) throw new Error('RPC call failed')
    ;(value as Record<string, unknown>)[entries[result.id][0]] = BigInt(result.result)
  }
  return value
}

export function loadLive(force = false) {
  if (!force && lastValue && Date.now() - lastValue.at < 30_000) return Promise.resolve(lastValue.value)
  if (!inflight) {
    inflight = fetchLive()
      .then((value) => {
        lastValue = { at: Date.now(), value }
        return value
      })
      .finally(() => {
        inflight = null
      })
  }
  return inflight
}

export function useTectonicLive() {
  const [data, setData] = useState<LiveState | null>(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback((force = false) => {
    setLoading(true)
    loadLive(force)
      .then((value) => {
        setData(value)
        setError(false)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { data, error, loading, refresh: () => refresh(true) }
}

export function toNumber(value: bigint, decimals = 18) {
  return Number(value) / 10 ** decimals
}

export function formatAmount(value: number, maximumFractionDigits = 6) {
  return value.toLocaleString('en-US', { maximumFractionDigits })
}

export function dailyFeeForRatio(ratio: number) {
  if (ratio > SAFE) return 0
  const clamped = Math.max(ratio, SUPER_CRITICAL)
  return ((SAFE - clamped) / (SAFE - SUPER_CRITICAL)) * MAX_DAILY_FEE
}

export type Band = 'healthy' | 'fee' | 'critical'

export function bandForRatio(ratio: number): Band {
  if (ratio < CRITICAL) return 'critical'
  if (ratio <= SAFE) return 'fee'
  return 'healthy'
}

export const BAND_INFO: Record<Band, { label: string; dot: string; pill: string; summary: string }> = {
  healthy: {
    label: 'Healthy',
    dot: 'bg-forest-500',
    pill: 'bg-forest-50 text-forest-600 ring-forest-100',
    summary: 'No stability fee. No triggered redemptions. SC behaves like digital dollars.',
  },
  fee: {
    label: 'Stability fee active',
    dot: 'bg-gold-500',
    pill: 'bg-gold-50 text-gold-700 ring-gold-200',
    summary: 'SC balances accrue a small daily fee until the ratio climbs back above 1.5.',
  },
  critical: {
    label: 'Triggered redemptions',
    dot: 'bg-ember-400',
    pill: 'bg-ember-50 text-ember-600 ring-ember-200',
    summary: 'Before each mint, Tectonic redeems some holders’ SC to ETH at full value to restore the ratio.',
  },
}
