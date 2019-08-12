import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dimension from '../style/dimension';
import { PrimaryButton, SecondaryButton } from '../general/Button';

export const Form = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
  padding: ${dimension.contentPadding};
  margin: auto;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${dimension.standardPadding} 0;
  font-size: ${dimension.fontSize};

  input {
    width: 100%;
    height: 35px;
    border-radius: 5px;
    border: none;
    text-indent: 5px;
    margin: 5px 0;
    border: solid 1px transparent;
    &:focus {
      border-color: ${props => props.theme.warning};
      outline: 0;
      transition: 0.2s; 
    }
  }
  span {
    width: 100%;
    color: ${props => props.theme.warning};
  }
`;

export const renderField = ({
  input, label, type, meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input placeholder={label} type={type} {...input} />
      {touched
        && (
          (error && <span>{error}</span>)
          || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

renderField.propTypes = {
  input: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({}).isRequired,
};

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${dimension.standardPadding} 0;
`;

export const Divider = styled.div`
  height: 1px;
  display: block;
  border: 0.5px solid white;
  margin: ${dimension.doublePadding} 0;
`;

export const SubmitButton = styled(PrimaryButton)`
  display: flex;
  margin: auto;
  margin-left: 5px;
`;

export const CancelButton = styled(SecondaryButton)`
  display: flex;
  margin: auto;
`;
