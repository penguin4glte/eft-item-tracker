import { ref } from 'vue'

// Module-scoped state shared across all data modules and components
const hasApiError = ref(false)
const isRetrying = ref(false)
const failedFetchers = new Set<() => Promise<unknown>>()

export const useApiError = () => {
  const reportApiError = (retry: () => Promise<unknown>) => {
    failedFetchers.add(retry)
    hasApiError.value = true
  }

  const clearApiError = (retry: () => Promise<unknown>) => {
    failedFetchers.delete(retry)
    if (failedFetchers.size === 0) {
      hasApiError.value = false
    }
  }

  const retryFailedFetches = async () => {
    if (isRetrying.value) return
    isRetrying.value = true
    try {
      await Promise.all(Array.from(failedFetchers).map(fetcher => fetcher()))
    } finally {
      isRetrying.value = false
    }
  }

  return {
    hasApiError,
    isRetrying,
    reportApiError,
    clearApiError,
    retryFailedFetches,
  }
}
