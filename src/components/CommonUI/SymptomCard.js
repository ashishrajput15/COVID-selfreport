import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import classnames from 'classnames';

class SymptomCard extends React.Component {
  render() {
    const { image, label, present, toggle } = this.props;

    return (
      <Col xs={6} className="pointer link">
        <Card
          onClick={toggle}
          outline
          color={present ? 'danger' : 'default'}
          className={classnames({ "pointer link symptom-card": true, "symptom-present": present })}
        >
          <CardHeader className="text-center">
            {label}
          </CardHeader>
          <CardBody className="text-center">
            {present && (
              <span className="check-icon text-danger">
                <i className="fa fa-check-circle fa-2x" />
              </span>
            )}
            <img src={image}  alt="cough" />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

SymptomCard.defaultProps = {
  present: false,
};

SymptomCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  present: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
};

export default SymptomCard;
