import React from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, Input, Label } from 'reactstrap';

class ReportSymptoms1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelf: false,
    };

    this.onIsSelfChanged = this.onIsSelfChanged.bind(this);
  }

  onIsSelfChanged(event) {
    this.setState({
      isSelf: (event.target.value === 'true')
    });
  }

  render() {
    const { jumpToStep } = this.props;

    return (
      <div>
        <p className="mb-2">Are you reporting for yourself or someone else?</p>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="isSelf"
              value="true"
              onChange={this.onIsSelfChanged}
            />
            {' '}
            I am reporting for Myself
          </Label>
        </FormGroup>

        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="isSelf"
              value="false"
              onChange={this.onIsSelfChanged}
            />
            {' '}
            I am reporting for someone I know
          </Label>
        </FormGroup>

        <br />

        <Button color="primary" onClick={() => {
          jumpToStep(2);
        }}>
          <i className="fa fa-arrow-right" />&nbsp;Next
        </Button>
      </div>
    );
  }
}

ReportSymptoms1.defaultProps = {
  jumpToStep: () => {
  },
};

ReportSymptoms1.propTypes = {
  jumpToStep: PropTypes.func,
};

export default ReportSymptoms1;
