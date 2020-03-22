import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

class ReportSymptoms3 extends React.Component {
  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="name">Your Full Name</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Jon Doe"
                value={""}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="otherPersonName">Name of Person</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="Full name of the person"
                value={""}
              />

              <p className="text-muted mt-1">
                <small>Enter full name of the person you are reporting.</small>
              </p>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="+91 12345 67890"
                value={""}
              />
            </FormGroup>
          </Col>

          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="alternatePhoneNumber">Alternate Contact Number</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="+91 12345 67890"
                value={""}
              />

              <p className="text-muted mt-1">
                <small>If you are reporting for someone else, please enter their mobile number as well.</small>
              </p>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6}>
            <FormGroup>
              <Label htmlFor="phoneNumber">Preferred Language</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="English"
                value={""}
              />
            </FormGroup>
          </Col>
        </Row>

        <br />

        <Button color="primary" onClick={() => {
          jumpToStep(4);
        }}>
          <i className="fa fa-arrow-right" />&nbsp;Next
        </Button>
      </div>
    );
  }
}

ReportSymptoms3.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms3.propTypes = {
  jumpToStep: PropTypes.func,
};

export default ReportSymptoms3;
