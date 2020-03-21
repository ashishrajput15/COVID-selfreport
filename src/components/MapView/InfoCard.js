import React from "react";
import PropTypes from 'prop-types';
import Fuse from "fuse.js";
import { STATE_HELPLINE_NUMBERS, HELPLINE_CONTENT, KEY_INFO_CONTENT } from "../../../tools/constants";


export class InfoCard extends React.PureComponent {
  static cardTypes = {
    HELPLINE: `HELPLINE`,
    KEY_INFO: `KEY_INFO`
  }

  render() {
    const { cardType, ...restProps } = this.props;
    return (
      cardType === InfoCard.cardTypes.HELPLINE ? <HelplineInfoCard {...restProps} /> : <KeyInfoCard />
    )
  }
}

const HelplineInfoCard = ({ stateName }) =>
  <div className="card info-card helpline-info-card">
    <CardHeading heading={`Helpline Numbers`} />
    <CardRow heading={stateName} subHeading={parsedHelplineNum(stateName)} />
    {HELPLINE_CONTENT.map(({ heading, subHeading }) =>
      <CardRow heading={heading} subHeading={subHeading} key={subHeading} />
    )}
  </div>

HelplineInfoCard.propTypes = {
  stateName: PropTypes.string.isRequired,
};

const KeyInfoCard = () => (
  <div className="card info-card key-info-card">
    <CardHeading heading={`Helpful Links`} />
    {KEY_INFO_CONTENT.map(({ heading, subHeading }) =>
      <CardRow heading={heading} subHeading={subHeading} key={subHeading} linked={true} />
    )}
  </div>
);

const CardHeading = ({ heading }) =>
  <div className="card-body" style={{ marginBottom: `-10%` }}>
    <h5 className="card-title">{heading}</h5>
  </div>

CardHeading.propTypes = {
  heading: PropTypes.string.isRequired,
};

const CardRow = ({ heading, subHeading, linked }) =>
  <div className="card-body">
    <h6 className="card-subtitle mb-2 text-muted">{heading}</h6>
    <p className="card-text">{linked ? <a href={subHeading}>{subHeading}</a> : subHeading}</p>
  </div>

CardRow.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  linked: PropTypes.bool.isRequired,
};

const parsedHelplineNum = StateName => {
  const options = {
    shouldSort: true,
    threshold: 0.8,
    location: 0,
    distance: 600,
    minMatchCharLength: 1,
    keys: ["stateName"]
  };
  const fuseS = new Fuse(STATE_HELPLINE_NUMBERS, options);
  return fuseS.search(StateName)[0].item.phoneNo;
};

InfoCard.propTypes = {
  cardType: PropTypes.string.isRequired
};




