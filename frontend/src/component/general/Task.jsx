import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import CloseCircleIcon from 'mdi-react/CloseCircleIcon';
import updateJobAction from '../../redux/actionCreators/jobs/updateJob';
import { getToken } from '../../redux/reducers/auth';
import dimension from '../style/dimension';

const TaskWrapper = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.jobListItemBg};
  border: solid 1px ${props => props.theme.jobListItemBg};
  border-radius: 10px;
  padding: ${dimension.standardPadding};
  margin-bottom: ${dimension.standardPadding};
`;

const RemoveBtn = styled(CloseCircleIcon)`
  :hover {
        color: ${props => props.theme.warning};
      }
      margin-left: ${dimension.halfPadding};
`
const CheckBtn = styled(CheckCircleIcon)`
  color: ${props => props.completed === 'true' && props.theme.primaryBtn};
  :hover {
        color: ${props => props.theme.primaryBtn};
      }
      margin-left: ${dimension.halfPadding};
`

const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: ${dimension.halfPadding};
`;

const Info = styled.div`
  display: flex;
  text-decoration: ${props => props.completed === 'true' ? 'line-through' : 'none'};
  word-break: break-all;
`;

const Task = (props) => {
  const {
    index,
    job,
    data,
    updateJob,
    token,
  } = props;

  const checkTask = (status) => {
    let updatedJob = job;
    updatedJob.tasks[index].completed = status;
    updateJob(job.id, updatedJob, token);
  };

  const removeTask = () => {
    let updatedJob = job;
    updatedJob.tasks.splice(index);
    updateJob(job.id, updatedJob, token);
  };

  return (
    <TaskWrapper>
      <Info completed={data.completed ? 'true' : 'false'}>{data.description}</Info>
      <Toolbar>
        <RemoveBtn onClick={() => removeTask()} />
        <CheckBtn completed={data.completed ? 'true' : 'false'} onClick={() => checkTask(!data.completed)} />
      </Toolbar>
    </TaskWrapper>
  );
};

Task.propTypes = {
  index: PropTypes.number.isRequired,
  job: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }),
  updateJob: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateJob: (id, job, token) => updateJobAction(id, job, token),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Task);
