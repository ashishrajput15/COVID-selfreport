export default {
  patientsData: {
    loading: false,
    loaded: false,
    error: null,

    ids: [],
    map: {},
  },

  reportsData: {
    loading: false,
    loaded: false,
    error: null,

    ids: [],
    map: {},
  },

  helpRequests: {
    loading: false,
    loaded: false,
    error: null,

    ids: [],
    map: {},
  },

  sendNewReport: {
    saving: false,
    saved: false,
    error: null,

    reportData: {},
  },

  sendNewReqHelp: {
    saving: false,
    saved: false,
    error: null,

    helpRequestData: {},
  },
};
