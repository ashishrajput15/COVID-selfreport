import React from 'react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Form, Modal, ModalBody, ModalHeader, FormGroup, Label, Input
} from 'reactstrap';

import { messages } from '../../../tools/messages';
import * as languageActions from '../../actions/language';
import { cookie } from '../../util';

class LanguageModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(/* nextProps */) { // eslint-disable-line react/no-deprecated
  }

  handleLanguageChange = (lng) => {
    this.props.actions.setLanguage(lng, cookie.getCookie('lng'));
    cookie.setCookie('lng', lng);
  }

  render() {
    let { language } = this.props;
    const intl = language.intl;
    const lngList = cloneDeep(language);
    delete lngList.intl;

    // Show simple form
    return (
      <Modal isOpen={true} toggle={this.props.toggleModal} className="language-modal" backdrop="static">
        <ModalHeader toggle={this.props.toggleModal} className="text-danger">
          Choose your preferred language
        </ModalHeader>

        <ModalBody className="pb-4">
          <Form autoComplete="off" action="" method="post" onSubmit={() => {
          }}>
          {
            Object.values(lngList).map(lng => (
              <FormGroup key={lng.id} check>
                <Label check>
                  <Input type="radio" name="radio3" value={lng.id} onChange={() => {
                    this.handleLanguageChange(lng.id)
                  }} />{' '}
                  {lng.text}
                </Label>
              </FormGroup>
            ))
          }
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

LanguageModal.defaultProps = {
  actions: {},
};

LanguageModal.propTypes = {
  actions: PropTypes.object,
  toggleModal: PropTypes.func.isRequired,
  intl: PropTypes.object,
  language: PropTypes.object,
};

const mapStateToProps = (state => ({
  language: state.language
}));

const mapDispatchToProps = (dispatch => ({
  actions: bindActionCreators(
    Object.assign({}, languageActions),
    dispatch,
  ),
}));

export default connect(mapStateToProps, mapDispatchToProps)(LanguageModal);
