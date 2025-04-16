const DEFAULT_DATA = {
  errorMessage: null,
  updating: null,
  pending: null,
  success: null,
  updated: null,
  error: null,
};

/* INITTERS */

export const initRequestState = () => ({
  errorMessage: null,
  pending: null,
  success: null,
  email: null,
  error: null,
});

export const initRequestWithDataState = (
  subData = null,
  additional = null,
  initData = null
) => ({
  ...DEFAULT_DATA,
  data: initData || {},
  ...(subData ? { data: subData } : null),
  ...(additional ? { additional } : null),
});

/* PENDING */

export const setUpdatePending = (state = {}) => ({
  ...state,
  errorMessage: DEFAULT_DATA.errorMessage,
  error: DEFAULT_DATA.error,
  updating: true,
  updated: false,
});

export const setRequestPending = (state = {}) => ({
  ...state,
  errorMessage: DEFAULT_DATA.errorMessage,
  success: DEFAULT_DATA.success,
  error: DEFAULT_DATA.error,
  pending: true,
});

export const setUpdateWithPaginationSuccess = (state = {}, data = null) => ({
  ...state,
  updating: false,
  updated: true,
  data: data?.pagination
    ? {
        pagination: data.pagination,
        list: data.pagination.skip ? data.list : [...state.list, ...data.list],
        ...data.dataAlso,
      }
    : data,
});

/* SUCCESS */

export const setRequestSuccess = (state = {}, data = null) => ({
  ...state,
  data: data || state.data,
  errorMessage: false,
  pending: false,
  success: true,
  error: false,
});

export const setRequestError = (state = {}, message = null) => ({
  ...state,
  errorMessage: message,
  updating: false,
  success: false,
  updated: false,
  pending: false,
  error: true,
});

/* RESET */

export const resetRequestStatus = (state = {}) => ({
  ...state,
  errorMessage: null,
  success: null,
  updated: null,
  error: null,
  pending: null,
});

export const resetErrorStatus = (state = {}) => ({
  ...state,
  errorMessage: null,
  error: null,
});

export const resetDataStore = () => ({
  data: null,
  error: false,
  errorMessage: false,
  updated: false,
  updating: false,
  success: false,
  pending: false,
});

/* GETTERS */

export const getErrorMessage = (state = {}) => state.errorMessage || null;
export const isRequestPending = (state = {}) => !!state.pending;
export const isRequestSuccess = (state = {}) => !!state.success;
export const isUpdatePending = (state = {}) => !!state.updating;
export const isUpdateSuccess = (state = {}) => !!state.updated;
export const isRequestError = (state = {}) => !!state.error;
export const getData = (state = {}, defaultValue = {}) =>
  state.data || defaultValue;
