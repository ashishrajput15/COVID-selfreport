import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

class ReportSymptoms3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      otherPersonName: '',
      phone: '',
      altPhone: '',
      preferredLang: '',
    };

    this.onFormFieldUpdate = this.onFormFieldUpdate.bind(this);
    this.onNameChanged = this.onFormFieldUpdate.bind(this, 'name');
    this.onOtherPersonNameChanged = this.onFormFieldUpdate.bind(this, 'otherPersonName');
    this.onPhoneChanged = this.onFormFieldUpdate.bind(this, 'phone');
    this.onAltPhoneChanged = this.onFormFieldUpdate.bind(this, 'altPhone');
    this.onPreferredLangChanged = this.onFormFieldUpdate.bind(this, 'preferredLang');
  }

  onFormFieldUpdate(name, event) {
    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const { jumpToStep } = this.props;
    const {
      name,
      otherPersonName,
      phone,
      altPhone,
      preferredLang,
    } = this.state;

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
                value={name}
                onChange={this.onNameChanged}
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
                value={otherPersonName}
                onChange={this.onOtherPersonNameChanged}
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
                value={phone}
                onChange={this.onPhoneChanged}
              />

              <p className="text-muted mt-1">
                <small>If you are looking for any help or want us to reach out to you, enter your mobile number above.
                </small>
              </p>
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
                value={altPhone}
                onChange={this.onAltPhoneChanged}
              />

              <p className="text-muted mt-1">
                <small>If you are reporting for someone else, enter their mobile number above.</small>
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
                value={preferredLang}
                onChange={this.onPreferredLangChanged}
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
