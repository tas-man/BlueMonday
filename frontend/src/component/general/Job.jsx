import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import ViewListIcon from 'mdi-react/ViewListIcon';
import deleteJobAction from '../../redux/actionCreators/jobs/deleteJob';
import { getToken } from '../../redux/reducers/auth';
import { ItemHeader } from './Header';
import dimension from '../style/dimension';
import { Link } from 'react-router-dom';

const JobWrapper = styled.div`
  max-width: 300px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.jobListItemBg};
  border: solid 1px ${props => props.theme.jobListItemBg};
  border-radius: 10px;
  padding: ${dimension.standardPadding};
  margin-bottom: ${dimension.standardPadding};
  :hover {
    border-color: ${props => props.theme.jobListItemHover};
    transition: 0.2s;
  }
  div > svg {
    :hover {
      color: ${props => props.theme.primaryBtn};
    }
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  padding: ${dimension.halfPadding} 0;
`;

const InfoWrapper = styled(Link)`
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.fontColor};
  text-decoration: none;
  border-radius: 10px;
  padding: ${dimension.halfPadding} 0;
  background: ${props => props.theme.jobListItemInfo};
  :hover {
    background: ${props => props.theme.jobListItemInfoHover};
    transition: 0.2s;
  }
`;

const Counter = styled.div`
  height: 30px;
  width: 30px;
  display: flex;
  border-radius: 50%;
  background: ${props => props.theme.jobListItemTaskCount};
  font-size: ${dimension.smallFontSize};
  align-items: center;
  justify-content: center;
  line-height: 30px;
  margin: 0 10px;
`;

const Info = styled.div`
  height: 30px;
  display: flex;
  line-height: 30px;
  margin-left: 10px;
`;

const Job = (props) => {
  const {
    data,
    to,
    deleteJob,
    token,
  } = props;

  const CountCompletedTasks = (tasks) => {
    let completedTasks = 0;
    tasks.forEach(task => {
      if(task.completed){
        completedTasks++;
      }
    });
    return completedTasks;
  }

  return (
    <JobWrapper id={data.id}>
      <TitleWrapper>
        <ItemHeader>{data.jobTitle}</ItemHeader>
        <CheckCircleIcon onClick={() => deleteJob(data.id, token)} />
      </TitleWrapper>
      <InfoWrapper to={to}>
        <ViewListIcon />
        <Info>Completed Tasks</Info>
        <Counter>
          {CountCompletedTasks(data.tasks)}
          /
          {data.tasks.length}
        </Counter>
      </InfoWrapper>
    </JobWrapper>
  );
};

Job.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    taskCount: PropTypes.number,
  }),
  deleteJob: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

Job.defaultProps = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: 'No Job Title',
    taskCount: 0,
  }),
};

const mapStateToProps = state => ({
  token: getToken(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteJob: (id, token) => deleteJobAction(id, token),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Job);
