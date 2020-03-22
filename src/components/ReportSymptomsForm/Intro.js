import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Col, Row } from 'reactstrap';

class Intro extends React.Component {
  render() {
    const { toggleHelplineBar, toggleKeyInfoBar, jumpToStep } = this.props;

    return (
      <div>
        <Alert color="danger">
          If you are strongly suspecting you have contracted COVID-19, please use
          the <a href={null} className="text-primary pointer link" onClick={toggleHelplineBar}>Helpline Numbers</a>
          &nbsp;to reach out to <a href="https://www.mohfw.gov.in" target="_blank" rel="noopener noreferrer">MoHFW, India</a>
          &nbsp;immediately.
        </Alert>

        <Row>
          <Col xs={12} md={12}>
            <p>
              If you want to report a symptom for yourself or someone you know,
              click the button below.
            </p>

            <Button
              color="primary"
              onClick={() => {
                jumpToStep(1);
              }}
            >
              <i className="fa fa-bullhorn" />&nbsp;
              Report Symptoms
            </Button>
          </Col>

          {/*<Col xs={12} md={6}>*/}
            {/*<p>*/}
              {/*If you are running low on any essential supplies, like food, masks, medicines,*/}
              {/*and want to raise a help request for them,*/}
              {/*click the button below.*/}
            {/*</p>*/}

            {/*<Button color="primary" disabled id="btn-request-supplies" title="Not available at the moment.">*/}
              {/*<i className="fa fa-medkit" />&nbsp;*/}
              {/*Request Supplies*/}
            {/*</Button>*/}
          {/*</Col>*/}
        </Row>

        <Row className="mt-5">
          <Col xs={12} md={12}>
            <p>
              For key information regarding the COVID-19 Pandemic,
              click the button below.
            </p>

            <Button color="info" onClick={toggleKeyInfoBar}>
              <i className="fa fa-info-circle" />&nbsp;
              Key Info
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

Intro.defaultProps = {
  jumpToStep: () => {
  },
};

Intro.propTypes = {
  jumpToStep: PropTypes.func,
  toggleHelplineBar: PropTypes.func.isRequired,
  toggleKeyInfoBar: PropTypes.func.isRequired,
};

export default Intro;
