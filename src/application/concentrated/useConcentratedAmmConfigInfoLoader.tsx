import { ApiClmmConfigItem } from '@raydium-io/raydium-sdk'

import jFetch from '@/functions/dom/jFetch'
import { toPercent } from '@/functions/format/toPercent'
import { div } from '@/functions/numberish/operations'
import useAsyncEffect from '@/hooks/useAsyncEffect'

import useAppSettings from '../common/useAppSettings'

import useConcentrated from './useConcentrated'
import useAppAdvancedSettings from '../common/useAppAdvancedSettings'

/**
 * will load concentrated info (jsonInfo, sdkParsedInfo, hydratedInfo)
 * @todo just register hooks in specific component
 */
export default function useConcentratedAmmConfigInfoLoader() {
  const availableAmmConfigFeeOptions = useConcentrated((s) => s.availableAmmConfigFeeOptions)
  const inDev = useAppSettings((s) => s.inDev)
  const clmmConfigsUrl = useAppAdvancedSettings((s) => s.apiUrls.clmmConfigs)

  /** fetch api json info list  */
  useAsyncEffect(async () => {
    if (availableAmmConfigFeeOptions?.length) return
    const response = await jFetch<{ data: Record<string, ApiClmmConfigItem> }>(clmmConfigsUrl)
    const data = inDev // dev data
      ? {
          // H2W : amm config for custom clmm contract
          '6pmWKxHs287mZccCsWvA3GdKQDFvKiSj8hq9c8dLffdU': {
            id: '6pmWKxHs287mZccCsWvA3GdKQDFvKiSj8hq9c8dLffdU',
            index: 1,
            protocolFeeRate: 12000,
            tradeFeeRate: 100,
            fundFeeRate: 100,
            fundOwner: '',
            tickSpacing: 1,
            description: 'Dev'
          },
          // H2W : amm config for custom clmm contract
          G3jaCuMqymMEAz89qG2iMBH5aS9FTLZzoNLrMMjHLzWp: {
            id: 'G3jaCuMqymMEAz89qG2iMBH5aS9FTLZzoNLrMMjHLzWp',
            index: 0,
            protocolFeeRate: 12000,
            tradeFeeRate: 2500,
            fundFeeRate: 2500,
            fundOwner: '',
            tickSpacing: 60,
            description: 'Dev'
          },
          // H2W : amm config for custom clmm contract
          '7xw4fxkb22vgZjNiPjQ7Mb3cB2o9nfV3vwg746y61CLk': {
            id: '7xw4fxkb22vgZjNiPjQ7Mb3cB2o9nfV3vwg746y61CLk',
            index: 2,
            protocolFeeRate: 12000,
            tradeFeeRate: 100,
            fundFeeRate: 100,
            fundOwner: '',
            tickSpacing: 10,
            description: 'Dev'
          }
        }
      : response?.data
    if (data) {
      useConcentrated.setState({
        availableAmmConfigFeeOptions: Object.values(data).map((i) => ({
          ...i,
          original: i,
          protocolFeeRate: toPercent(div(i.protocolFeeRate, 10 ** 4), { alreadyDecimaled: true }),
          tradeFeeRate: toPercent(div(i.tradeFeeRate, 10 ** 4), { alreadyDecimaled: true })
        }))
      })
    }
  }, [inDev, clmmConfigsUrl])
}
