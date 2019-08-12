import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Header } from "../../general/Header";
import PlusCircleIcon from "mdi-react/PlusCircleIcon";
import CircleEditOutline from "mdi-react/CircleEditOutlineIcon";
import { ViewWrapper, ContentWrapper } from "../../general/ViewWrapper";
import readJobAction from "../../../redux/actionCreators/jobs/readJob";
import getSessionAction from "../../../redux/actionCreators/auth/getSession";
import { getToken } from "../../../redux/reducers/auth";
import { BackButton } from "../../general/BackButton";
import Task from "../../general/Task";
import Modal from "../../general/Modal";
import { WidePrimaryButton } from "../../general/Button";
import { toggleEditJobModal, toggleCreateTaskModal } from "../../../redux/actions/ui";
import { editJobModalIsVisible, createTaskModalIsVisible } from "../../../redux/reducers/ui";
import JobForm from "../../forms/JobForm";
import TaskForm from "../../forms/TaskForm";
import Prompt from '../../general/Prompt';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobView = props => {
  const {
    match,
    token,
    readJob,
    job,
    jobModalIsVisible,
    taskModalIsVisible,
    toggleJobModal,
    toggleTaskModal
  } = props;

  useEffect(() => {
    async function fetchData() {
      await readJob(match.params.id, token);
    }
    fetchData();
  }, [match, readJob, token]);

  return (
    <ViewWrapper>
      <BackButton />
      <HeaderWrapper>
        <Header>{job && job.jobTitle}</Header>
        <CircleEditOutline onClick={() => toggleJobModal()}/>
      </HeaderWrapper>
      <ContentWrapper>
        {job.tasks[0] ? (
          job.tasks.map((task, index) => (
            <Task key={index} index={index} job={job} data={task} />
          ))
        ) : (
          <Prompt>
            <span>There are currently no tasks added to this job.</span>
          </Prompt>
        )}
        <WidePrimaryButton onClick={() => toggleTaskModal()}>
          <PlusCircleIcon />
          <span>Create Task</span>
        </WidePrimaryButton>
      </ContentWrapper>
      {jobModalIsVisible && (
        <Modal form={<JobForm data={job} />} type="editJob" />
      )}
      {taskModalIsVisible && (
        <Modal form={<TaskForm data={job} />} type="task" />
      )}
    </ViewWrapper>
  );
};

JobView.propTypes = {
  getSession: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  job: PropTypes.shape({}).isRequired,
  toggleJobModal: PropTypes.func.isRequired,
  toggleTaskModal: PropTypes.func.isRequired,
  jobModalIsVisible: PropTypes.bool.isRequired,
  taskModalIsVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  token: getToken(state),
  job: state.jobs.currentJob,
  jobModalIsVisible: editJobModalIsVisible(state),
  taskModalIsVisible: createTaskModalIsVisible(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSession: token => getSessionAction(token),
      readJob: (id, token) => readJobAction(id, token),
      toggleJobModal: () => toggleEditJobModal(),
      toggleTaskModal: () => toggleCreateTaskModal()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobView);
