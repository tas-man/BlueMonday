import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CloseIcon from 'mdi-react/CloseIcon';
import dimension from '../style/dimension';
import { 
  toggleCreateJobModal,
  toggleEditJobModal,
  toggleCreateTaskModal,
  toggleEditAccountModal
} from '../../redux/actions/ui';
import { NavMenuButton } from './Button';

const Modal = styled.div`
  height: 100vh;
  min-width: 100vw;
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 5px;
  left: 0;
  top: 0;
  overflow: none;
  background-color: ${props => props.theme.modalBg};
`;

const ModalContent = styled.div`
  max-height: 600px;
  min-width: 300px;
  max-width: 400px;
  width: 80%;
  background-color: ${props => props.theme.modalContentBg};
  border-radius: 10px;
  margin: auto;
  overflow: auto;
  font-size: ${dimension.fontSizeHeader};
  padding: ${dimension.standardPadding};
`;

const ModalToolbar = styled.div`
  height: 60px;
  max-width: 400px;
  width: 80%;
  margin: auto;
`;

const ModalCloseBtn = styled(NavMenuButton)`
  float: right;
`;

const ModalCloseIcon = styled(CloseIcon)`
  margin: auto;
`;

const ActionModal = ({ toggleModal, form, type }) => {
  return (
    <Modal>
      <ModalToolbar>
        <ModalCloseBtn onClick={() => toggleModal(type)}>
          <ModalCloseIcon />
        </ModalCloseBtn>
      </ModalToolbar>
      <ModalContent>
        {form}
      </ModalContent>
    </Modal>
  );
};

ActionModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  form: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleModal: (formType) => {
    switch (formType) {
      case 'job': {
        return toggleCreateJobModal();
      }
      case 'editJob': {
        return toggleEditJobModal();
      }
      case 'task': {
        return toggleCreateTaskModal();
      }
      case 'account': {
        return toggleEditAccountModal();
      }
      default: {
        break;
      }
    }
  },
}, dispatch);

export default connect(null, mapDispatchToProps)(ActionModal);
