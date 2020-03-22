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
    const { cardType, toggle, ...restProps } = this.props;
    return (
      cardType === InfoCard.cardTypes.HELPLINE ? <HelplineInfoCard toggle={toggle} {...restProps} /> : <KeyInfoCard toggle={toggle} />
    )
  }
}

export const HelplineInfoCard = ({ stateName, toggle }) =>
  <div className="card info-card helpline-info-card">
    {toggle !== null  && (
      <CardHeading onClose={toggle} heading={`Helpline Numbers`} />
    )}

    {stateName && (
      <CardRow heading={stateName} subHeading={parsedHelplineNum(stateName)} />
    )}

    {HELPLINE_CONTENT.map(({ heading, subHeading }) =>
      <CardRow heading={heading} subHeading={subHeading} key={subHeading} />
    )}
  </div>

HelplineInfoCard.defaultProps = {
  stateName: '',
};

HelplineInfoCard.propTypes = {
  stateName: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};

const KeyInfoCard = ({ toggle }) => (
  <div className="card info-card key-info-card">
    <CardHeading onClose={toggle} heading={`Helpful Links`} />
    {KEY_INFO_CONTENT.map(({ heading, subHeading }) =>
      <CardRow heading={heading} subHeading={subHeading} key={subHeading} linked={true} />
    )}
  </div>
);

KeyInfoCard.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export const CardHeading = ({ heading, onClose }) =>
  <div className="card-body" style={{ marginBottom: `-10%` }}>
    <div className="row">
      <div className="col-10">
        <h5>{heading}</h5>
      </div>

      <div className="col-2 text-center">
        <a href={null} className="pointer link btn-close" onClick={onClose}>
          <i className="fa fa-times" />
        </a>
      </div>
    </div>
  </div>

CardHeading.defaultProps = {
  onClose: null,
};

CardHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export const CardRow = ({ heading, subHeading, linked }) =>
  <div className="card-body">
    <h6 className="card-subtitle mb-2 text-muted">{heading}</h6>
    <p className="card-text">{linked ? <a href={subHeading}>{subHeading}</a> : subHeading}</p>
  </div>

CardRow.propTypes = {
  heading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
  linked: PropTypes.bool.isRequired,
};

export const parsedHelplineNum = StateName => {
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
  cardType: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};




