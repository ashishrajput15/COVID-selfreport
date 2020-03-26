import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'reactstrap';
import { messages } from '../../../tools/messages';

class Intro extends React.Component {
  render() {
    const { toggleModal, jumpToStep, intl } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12} md={12} className="text-center">
            <p>
              {intl.formatMessage(messages.letsFightComSpread)}
            </p>

            <h5>
              {intl.formatMessage(messages.symptomsQuestion)}
            </h5>

            <br />

            <Row>
              <Col xs={12} md={12} className="justify-content-center">
                <Button
                  color="primary"
                  onClick={() => {
                    jumpToStep(1);
                  }}
                  size="lg"
                >
                  {intl.formatMessage(messages.yes)}
                </Button>

                <Button
                  className="ml-4"
                  color="secondary"
                  onClick={toggleModal}
                  size="lg"
                >
                  {intl.formatMessage(messages.no)}
                </Button>
              </Col>
            </Row>
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

        {/*<Row className="mt-5">*/}
          {/*<Col xs={12} md={12}>*/}
            {/*<p>*/}
              {/*For key information regarding the COVID-19 Pandemic,*/}
              {/*click the button below.*/}
            {/*</p>*/}

            {/*<Button color="info" onClick={toggleKeyInfoBar}>*/}
              {/*<i className="fa fa-info-circle" />&nbsp;*/}
              {/*Key Info*/}
            {/*</Button>*/}
          {/*</Col>*/}
        {/*</Row>*/}
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
  toggleModal: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired
};

export default Intro;
