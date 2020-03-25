export let env = process.env.REACT_APP_HOST_ENV || process.env.NODE_ENV;
export let appUrl, apiBaseUrl;
export let googleAnalyticsId;

export const randomColors = [
  "#287E45",
  "#D22B39",
  "#396AC3",
  "#B7845A",
  "#E983B4",
  "#26D04D",
  "#E0CF8B",
  "#C11288",
  "#0AD4CC",
  "#B6E92E",
  "#AE3896",
  "#FB154A"
];

if (!env) {
  env = 'development';
}

switch (env) {
  case 'production': {
    appUrl = 'https://reportcorona.live';
    apiBaseUrl = 'https://reportcorona.live';
    appUrl = getApiUrl();
    googleAnalyticsId = 'UA-124346507-2';
    break;
  }

  default: {
    env = 'development';
    appUrl = 'http://localhost:3000';
    apiBaseUrl = 'http://localhost:9192';
    googleAnalyticsId = 'UA-129318919-1';
    break;
  }
}

export const getApiUrl = (stateName) => {
  let url = '';
  if(env === 'development') {
    return 'http://localhost:3000';
  }
  switch(stateName.toLowerCase()){
    case 'karnataka': {
      url = 'https://reportcorona.live';
      break;
    }
    default: {
      url = 'https://reportcorona.live';
    }
  }
  return url;
}
