export default {
  patientsData: {
    loading: false,
    loaded: false,
    error: null,

    ids: [],
    map: {},
  },
  reportModals: {
    requestHelpModal: false,
    reportSymptomsModal: false,
    reportCaseModal: false,

    reportCaseStats: {
      myself: true,
      symptoms: {
        cough: false,
        fever: false,
        sob: false,
      },
      haveCoronaVirus: false,
    },
    generalStats: {
      nameSelf: 'John Doe',
      numberSelf: '9999999999',
      nameOther: 'John Doe',
      numberOther: '8888888888'
    },
  },
};
