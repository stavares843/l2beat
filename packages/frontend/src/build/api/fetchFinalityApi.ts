import { FinalityApiResponse, FinalityDataPoint } from '@l2beat/shared-pure'

import { JsonHttpClient } from '../caching/JsonHttpClient'
import { Config } from '../config'

export async function fetchFinalityApi(
  backend: Config['backend'],
  http: JsonHttpClient,
): Promise<FinalityApiResponse> {
  if (backend.mock) {
    return getMockFinalityApiResponse()
  }
  const url = backend.apiUrl + '/api/finality'
  const json = await http.fetchJson(url)
  return FinalityApiResponse.parse(json)
}

function getMockFinalityApiResponse(): FinalityApiResponse {
  const projects = [
    'arbitrum',
    'optimism',
    'apex',
    'aevo',
    'base',
    'dydx',
    'brine',
    'linea',
    'myria',
    'scroll',
  ].reduce<Record<string, FinalityDataPoint>>((acc, cur) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    acc[cur] = generateMockData()
    return acc
  }, {})

  return {
    projects,
  }
}

function generateMockData(): FinalityDataPoint {
  return {
    averageInSeconds: generateRandomTime(),
    maximumInSeconds: generateRandomTime(),
  }
}

function generateRandomTime() {
  const i = Math.round(Math.random() * 100)
  if (i < 50) {
    return Math.round(Math.random() * 3600)
  }
  if (i < 90) {
    return 3600 + Math.round(Math.random() * 82800)
  }
  return 86400 + Math.round(Math.random() * 86400 * 5)
}