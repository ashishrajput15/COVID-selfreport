import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

class ReportSymptoms3 extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      form: {},
    }
  }

  updateForm = (key, value) => {
    const { form } = this.state;
    form[key] = value;

    this.setState(prevState => ({
      ...prevState,
      form,
    }))
  }

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
                name="name"
                value={this.state.form['name']}
                onChange={(e) => this.updateForm(e.target.name, e.target.value)}
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
                name="personName"
                value={this.state.form['personName']}
                onChange={(e) => this.updateForm(e.target.name, e.target.value)}
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
                name="phone"
                value={this.state.form['phone']}
                onChange={(e) => this.updateForm(e.target.name, e.target.value)}
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
                name="altPhone"
                value={this.state.form['altPhone']}
                onChange={(e) => this.updateForm(e.target.name, e.target.value)}
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
              <Label htmlFor="preferredLanguage">Preferred Language</Label>
              <Input
                autoComplete="off"
                type="text"
                placeholder="English"
                name="preferredLang"
                value={this.state.form['preferredLang']}
                onChange={(e) => this.updateForm(e.target.name, e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <br />

        <div className="report-symptoms-modal-footer">
          <Button color="primary" onClick={() => {
            jumpToStep(2);
          }}>
            <i className="fa fa-arrow-left" />&nbsp;Back
          </Button>
          <Button color="primary" onClick={() => {
            jumpToStep(4);
          }}>
            <i className="fa fa-arrow-right" />&nbsp;Next
          </Button>
        </div>
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
