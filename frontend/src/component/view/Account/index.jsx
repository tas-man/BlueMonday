import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import PencilIcon from 'mdi-react/PencilIcon';
import { Header } from '../../general/Header';
import { ViewWrapper, ContentWrapper } from '../../general/ViewWrapper';
import AccountForm from '../../forms/AccountForm';
import { WidePrimaryButton } from '../../general/Button';
import { getSessionUser, getToken } from '../../../redux/reducers/auth';
import getSessionAction from '../../../redux/actionCreators/auth/getSession';
import { toggleEditAccountModal } from '../../../redux/actions/ui';
import Modal from '../../general/Modal';
import { editAccountModalIsVisible } from '../../../redux/reducers/ui';
import { Detail, DetailWrapper, DetailsWrapper } from '../../general/Detail';
import { BackButton } from '../../general/BackButton';

const Account = (props) => {
  const {
    sessionUser,
    modalIsVisible,
    toggleModal,
    getSession,
    token,
  } = props;

  useEffect(() => {
    async function fetchData() {
      await getSession(token);
    }
    fetchData();
  }, [getSession, token]);

  return (
    <ViewWrapper>
      <BackButton />
      <Header>Account Details</Header>
      <ContentWrapper>
        <DetailsWrapper>
          <DetailWrapper>
            <span>Username</span>
            <Detail>{sessionUser.username}</Detail>
          </DetailWrapper>
          <DetailWrapper>
            <span>First Name</span>
            <Detail>{sessionUser.firstName}</Detail>
          </DetailWrapper>
          <DetailWrapper>
            <span>Last Name</span>
            <Detail>{sessionUser.lastName}</Detail>
          </DetailWrapper>
          <DetailWrapper>
            <span>Email</span>
            <Detail>{sessionUser.email}</Detail>
          </DetailWrapper>
          <DetailWrapper>
            <span>Account Created At</span>
            <Detail>{sessionUser.createdDate}</Detail>
          </DetailWrapper>
          { sessionUser.isAdmin && (
            <DetailWrapper>
              <span>System Role</span>
              <Detail>Administrator</Detail>
            </DetailWrapper>
          )}
        </DetailsWrapper>
      
        <WidePrimaryButton onClick={() => toggleModal()}>
          <PencilIcon />
          <span>Update Account</span>
        </WidePrimaryButton>
      </ContentWrapper>
      { modalIsVisible && (
        <Modal form={<AccountForm />} type="account" />
      )}
    </ViewWrapper>
  );
};

Account.propTypes = {
  sessionUser: PropTypes.shape({}).isRequired,
  getSession: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  modalIsVisible: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  sessionUser: getSessionUser(state),
  token: getToken(state),
  modalIsVisible: editAccountModalIsVisible(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSession: token => getSessionAction(token),
  toggleModal: () => toggleEditAccountModal(),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Account);
