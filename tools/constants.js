
export const STATE_HELPLINE_NUMBERS = [
  { stateName: "Andhra Pradesh", phone1: `0866-2410978` },
  { stateName: "Arunachal Pradesh", phone1: `9536055743` },
  { stateName: "Assam", phone1: `6913347770` },
  { stateName: "Bihar", phone1: `104` },
  { stateName: "Chhattisgarh", phone1: `077122-35091` },
  { stateName: "Goa", phone1: `104` },
  { stateName: "Gujarat", phone1: `104` },
  { stateName: "Haryana", phone1: `8558893911` },
  { stateName: "Himachal Pradesh", phone1: `104` },
  { stateName: "Jharkhand", phone1: `104` },
  { stateName: "Karnataka", phone1: `080-46848600`, phone2: `080-66692000`, phone3: `104` },
  { stateName: "Kerala", phone1: `0471-2552056` },
  { stateName: "Madhya Pradesh", phone1: `0755-2527177` },
  { stateName: "Maharashtra", phone1: `020-26127394` },
  { stateName: "Manipur", phone1: `3852411668` },
  { stateName: "Meghalaya", phone1: `9366090748` },
  { stateName: "Mizoram", phone1: `102` },
  { stateName: "Nagaland", phone1: `7005539653` },
  { stateName: "Odisha", phone1: `9439994859` },
  { stateName: "Punjab", phone1: `104` },
  { stateName: "Rajasthan", phone1: `0141-2225624` },
  { stateName: "Sikkim", phone1: `104` },
  { stateName: "Tamil Nadu", phone1: `044-29510500` },
  { stateName: "Telangana", phone1: `104` },
  { stateName: "Tripura", phone1: `0381-2315879` },
  { stateName: "Uttarakhand", phone1: `104` },
  { stateName: "Uttar Pradesh", phone1: `18001805145` },
  { stateName: "West Bengal", phone1: `3323412600` },
  { stateName: "Andaman and Nicobar Islands", phone1: `03192-232102` },
  { stateName: `Chandigarh`, phone1: `9779558282` },
  { stateName: "Dadra and Nagar Haveli and Daman & Diu", phone1: `104` },
  { stateName: "Delhi", phone1: `011-22307145` },
  { stateName: "Jammu & Kashmir", phone1: `01912520982`, phone2: `0194-2440283` },
  { stateName: "Ladakh", phone1: "01982256462" },
  { stateName: "Lakshadweep", phone1: `104` },
  { stateName: `Puducherry`, phone1: `104` }
];

export const HELPLINE_CONTENT = [{
  heading: 'National Helpline Number',
  phone1: '1075',
  phone2: '1800-112-545',
}, {
  heading: 'Central Helpline Number',
  phone1: `+91-11-23978043`,
  phone2: `+91-11-23978046`,
}, {
  heading: 'Central Helpling Email',
  email1: `ncov2019@gmail.com`,
}];

export const KEY_INFO_CONTENT = [
  {
    heading: `HELPLINE NUMBERS (by State)`,
    subHeading: `https://www.mohfw.gov.in/coronvavirushelplinenumber.pdf`
  },
  {
    heading: `Ministry of Health and Family Welfare, Gov. of India`,
    subHeading: `https://www.mohfw.gov.in/`
  },
  {
    heading: `WHO : COVID-19 Home Page`,
    subHeading: `https://www.who.int/emergencies/diseases/novel-coronavirus-2019`
  },
  {
    heading: `CDC`,
    subHeading: `https://www.cdc.gov/coronavirus/2019-ncov/faq.html`
  },
  {
    heading: `COVID-19 Global Tracker`,
    subHeading: `https://coronavirus.thebaselab.com/`
  }
];

export const MapStyle1 = [{
  featureType: "administrative",
  stylers: [
    { visibility: "on" }
  ],
}, {
  featureType: "poi",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "water",
  stylers: [
    { visibility: "on" }
  ],
}, {
  featureType: "road",
  stylers: [
    { visibility: "off" }
  ]
}, {
  featureType: "transit",
  stylers: [
    { visibility: "off" }
  ]
}];

export const MapStyle2 = [{
  featureType: "administrative",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.business",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.park",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.government",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.attraction",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.place_of_worship",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.sports_complex",
  stylers: [
    { visibility: "off" }
  ],
}, {
  featureType: "poi.meal_takeaway",
  stylers: [
    { visibility: "on" }
  ],
}, {
  featureType: 'poi.medical',
  stylers: [
    { visibility: "on" }
  ],
}, {
  featureType: "water",
  stylers: [
    { visibility: "on" }
  ],
}, {
  featureType: "road",
  stylers: [
    { visibility: "on" }
  ]
}, {
  featureType: "transit",
  stylers: [
    { visibility: "off" }
  ]
}];

export const MapStyleDark = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
];

export const MarkerClusterStyles = [
  {
    width: 30,
    height: 30,
    className: 'reporter-custom-clustericon-1'
  },
  {
    width: 40,
    height: 40,
    className: 'reporter-custom-clustericon-2'
  },
  {
    width: 50,
    height: 50,
    className: 'reporter-custom-clustericon-3'
  }
];
