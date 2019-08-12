import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import PlusCircleIcon from 'mdi-react/PlusCircleIcon';
import { Header } from '../../general/Header';
import { ViewWrapper, ContentWrapper } from '../../general/ViewWrapper';
import Job from '../../general/Job';
import { WidePrimaryButton } from '../../general/Button';
import { getJobs, getJobsPending } from '../../../redux/reducers/jobs';
import readJobsAction from '../../../redux/actionCreators/jobs/readJobs';
import getSessionAction from '../../../redux/actionCreators/auth/getSession';
import { getToken } from '../../../redux/reducers/auth';
import { createJobModalIsVisible } from '../../../redux/reducers/ui';
import Modal from '../../general/Modal';
import { toggleCreateJobModal } from '../../../redux/actions/ui';
import CreateJobForm from '../../forms/JobForm';
import Prompt from '../../general/Prompt';

const Dashboard = (props) => {
  const {
    jobs,
    pending,
    readJobs,
    getSession,
    token,
    modalIsVisible,
    toggleModal,
  } = props;

  useEffect(() => {
    async function fetchData() {
      await getSession(token);
      await readJobs(token);
    }
    fetchData();
  }, [getSession, readJobs, token]);

  return (
    <ViewWrapper>
      <Header>Dashboard</Header>
      <ContentWrapper>
        {jobs[0] ? jobs.map((job) => (
          <Job
            key={job.id}
            data={job}
            to={`/jobs/${job.id}`}
          />
        )) : (
          <Prompt>
            <span>You currently have no jobs</span>
          </Prompt>
        )}
        <WidePrimaryButton onClick={() => toggleModal()}>
          <PlusCircleIcon />
          <span>Create Job</span>
        </WidePrimaryButton>
        {pending && <span>Loading resources...</span>}
      </ContentWrapper>
      { modalIsVisible && (
        <Modal form={<CreateJobForm />} type="job" />
      )}
    </ViewWrapper>
  );
};

Dashboard.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  pending: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  getSession: PropTypes.func.isRequired,
  readJobs: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalIsVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  pending: getJobsPending(state),
  jobs: getJobs(state),
  token: getToken(state),
  modalIsVisible: createJobModalIsVisible(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSession: token => getSessionAction(token),
  readJobs: token => readJobsAction(token),
  toggleModal: () => toggleCreateJobModal(),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
