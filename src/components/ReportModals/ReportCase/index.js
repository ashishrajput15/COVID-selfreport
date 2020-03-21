import React from 'react';
import AriaModal from 'react-aria-modal';
import PropTypes from 'prop-types';

import Wizard from './ReportCase';

class ReportCase extends React.Component {
  render() {
    return (
      <AriaModal
          titleText="Report Case"
          onExit={() => this.props.toggleModal()}
          initialFocus="#demo-one-deactivate"
          getApplicationNode={this.props.applicationNode}
          underlayStyle={{ paddingTop: '2em' }}
          verticallyCenter={true}
        >
          <div id="report-case-modal" className="reportModal">
            <Wizard reporterActions={this.props.reporterActions}/>
          </div>
        </AriaModal>
        )
      }
    }

ReportCase.propTypes = {
  applicationNode: PropTypes.instanceOf(Element),
  toggleModal: PropTypes.func,
  reporterActions: PropTypes.object,
}

export default ReportCase;
