import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroupItem,
  ListGroupItemText,
  FormGroup,
  Input,
  Label,
  FormText,
  Alert,
} from 'reactstrap';

class ReportSymptoms4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      fade: {},
      chooseState: false,
      contact: false,
      fillContent: false,
      precondition: false,
      form: {},
    }
  }

  setFade = (key, value) => {
    const { fade } = this.state;
    fade[key] = value;
    this.setState(prevState => ({
      prevState,
      fade,
    }))
  }

  handleForm = (key, value) => {
    const { form } = this.state;
    form[key] = value;

    this.setState(prevState => ({
      ...prevState,
      form,
    }))
  }

  handleCountry = (radioValue) => {
    this.setState({ chooseState: radioValue === 'yes' ? true : false });
  }

  handleContact = (radioValue) => {
    this.setState({ contact: radioValue === 'yes' ? true : false })
  }

  handlePrecondition = (radioValue) => {
    this.setState({ precondition: radioValue === 'yes' ? true : false })
  }

  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p>
          Have you traveled to a high-risk country/Indian state or
          been in contact with someone who is ill and has traveled
          to a high risk country/Indian state in the last 14 days?
        </p>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value="yes" onChange={(e) => {
                this.setState({ step: 2 })
                this.handleCountry(e.target.value);
              }} />{' '}
              Yes
            </Label>
            {
              this.state.chooseState && (
                <FormGroup row>
                  <br />
                  <FormText color="muted">
                    Which state/country did you travel to?
                  </FormText>
                  <Input type="text" name="state" id="state" onChange={(e) => {
                    this.handleForm(e.target.name, e.target.value)
                  }} />
                </FormGroup>
              )
            }
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio1" value="no" onChange={(e) => {
                this.setState({ step: 2 })
                this.handleCountry(e.target.value)
              }} />{' '}
              No
            </Label>
          </FormGroup>
        </FormGroup>
        <hr />
        <p>
          Have you been in close contact with a laboratory confirmed COVID-19
          patient within the past 14 days?
        </p>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" value="yes" onChange={(e) => {
                this.setState({ step: 3 })
                this.handleContact(e.target.value);
              }} />{' '}
              Yes
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio2" value="no" onChange={(e) => {
                this.setState({ step: 3 })
                this.handleContact(e.target.value);
              }} />{' '}
              No
            </Label>
          </FormGroup>
        </FormGroup>
        <hr />
        <p>
          Do you have a chronic Illness (Heart, Lung, or Kidney Disease, Diabetes)
          or are immunocompromised (Cancer, HIV, Autoimmune Disease)?
        </p>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio3" value="yes" onChange={(e) => {
                this.setState({ step: 4 })
                this.handlePrecondition(e.target.value);
              }} />{' '}
              Yes
            </Label>
            {
              this.state.precondition && (
                <FormGroup row>
                  <br />
                  <FormText color="muted">
                    Please specify your condition
                  </FormText>
                  <Input type="text" name="condition" id="condition" onChange={(e) => {
                    this.handleForm(e.target.name, e.target.value);
                  }} />
                </FormGroup>
              )
            }
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="radio3" value="no" onChange={(e) => {
                this.setState({ step: 4 })
                this.handlePrecondition(e.target.value);
              }} />{' '}
              No
            </Label>
          </FormGroup>
        </FormGroup>
        <br />
        {
          this.state.fillContent && (
            <Alert color="danger"> Please mark the options before proceeding </Alert>
          )
        }

        <div className="report-symptoms-modal-footer">
          <Button color="primary" onClick={() => {
            jumpToStep(3);
          }}>
            <i className="fa fa-arrow-left" />&nbsp;Back
          </Button>
          <Button color="primary" onClick={() => {
            const proceed = (this.state.step === 4);
            (!proceed) && this.setState({ fillContent: true });
            (proceed) && jumpToStep(5);
          }}>
            <i className="fa fa-arrow-right" />&nbsp;Next
          </Button>
        </div>
      </div>
    );
  }
}

ReportSymptoms4.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms4.propTypes = {
  jumpToStep: PropTypes.func,
};

export default ReportSymptoms4;
