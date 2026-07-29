<template>
  <div
    v-if="hasApiError"
    class="bg-red-900/40 border border-red-700 rounded-lg p-4 mb-6 flex flex-wrap items-center gap-3"
    role="alert"
  >
    <div class="flex items-start space-x-3 flex-1 min-w-64">
      <svg class="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      <div>
        <p class="text-sm font-semibold text-red-200">{{ $t('api_error.title') }}</p>
        <p class="text-sm text-red-300">{{ $t('api_error.message') }}</p>
      </div>
    </div>
    <button
      @click="retryFailedFetches"
      :disabled="isRetrying"
      class="flex-shrink-0 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-red-700 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
    >
      <svg
        v-if="isRetrying"
        class="w-4 h-4 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <span>{{ isRetrying ? $t('api_error.retrying') : $t('api_error.retry') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const { hasApiError, isRetrying, retryFailedFetches } = useApiError()
</script>
