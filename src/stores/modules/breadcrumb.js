import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: () => ({
    breadcrumb: [],
  }),
})
