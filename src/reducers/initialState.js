const language = {
  en: {
    show: true,
    id: 'en',
    text: 'English',
  },
  kn: {
    show: false,
    id: 'kn',
    text: 'ಕನ್ನಡ',
  },
  hi: {
    show: false,
    id: 'hi',
    text: 'हिंदी',
  },
  mr: {
    show: false,
    id: 'mr',
    text: 'मराठी',
  },
  ta: {
    show: false,
    id: 'ta',
    text: 'தமிழ்',
  },
  ml: {
    show: false,
    id: 'ml',
    text: 'മലയാളം',
  },
  te: {
    show: false,
    id: 'te',
    text: 'తెలుగు',
  },
  gu: {
    show: false,
    id: 'gu',
    text: 'ગુજરાતી',
  },
  bn: {
    show: false,
    id: 'bn',
    text: 'বাংলা',
  },
  or: {
    show: false,
    id: 'or',
    text: 'ओड़िया',
  },
  intl: {}
};

export default {
  patientsData: {
    latlngKey: {
      loading: false,
      loaded: false,
      error: null,

      ids: [],
      map: {},
    },
  },

  reportsData: {
    latlngKey: {
      loading: false,
      loaded: false,
      error: null,

      ids: [],
      map: {},
    },
  },

  helpRequests: {
    latlngKey: {
      loading: false,
      loaded: false,
      error: null,

      ids: [],
      map: {},
    },
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

  language,
};
