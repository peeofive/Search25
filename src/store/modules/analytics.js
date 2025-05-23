import { reactive, computed } from 'vue';
import { 
  searchMetrics,
  noResultSearches,
  lowClickSearches,
  topClickedSearches,
  generateDailyDataForRange
} from '../../data/searchAnalytics.mock';

const state = reactive({
  metrics: searchMetrics,
  noResultSearches: noResultSearches.value,
  lowClickSearches: lowClickSearches.value,
  topClickedSearches: topClickedSearches.value,
  selectedBU: null,
  dateRange: null,
  loading: false,
  error: null
});

export const useAnalyticsStore = () => {
  const setSelectedBU = (bu) => {
    state.selectedBU = bu;
  };

  const setDateRange = (range) => {
    state.dateRange = range;
  };

  const getDailyData = (startDate, endDate) => {
    return generateDailyDataForRange(startDate, endDate);
  };

  const getMetricsByBU = (bu) => {
    return state.metrics.find(m => m.bu === bu) || null;
  };

  const getSearchesByBU = (type, bu) => {
    if (!bu) return [];
    return state[`${type}Searches`].filter(s => s.bu === bu);
  };

  return {
    // State
    metrics: computed(() => state.metrics),
    noResultSearches: computed(() => state.noResultSearches),
    lowClickSearches: computed(() => state.lowClickSearches),
    topClickedSearches: computed(() => state.topClickedSearches),
    selectedBU: computed(() => state.selectedBU),
    dateRange: computed(() => state.dateRange),
    loading: computed(() => state.loading),
    error: computed(() => state.error),

    // Actions
    setSelectedBU,
    setDateRange,
    getDailyData,
    getMetricsByBU,
    getSearchesByBU
  };
};