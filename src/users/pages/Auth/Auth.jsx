import React, { useState, useContext, Fragment } from 'react';
import { useForm } from '../../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../../shared/utils/validator';
import { useHttpRequest } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Input from '../../../shared/components/UIElements/FormElements/Input';
import Button from '../../../shared/components/UIElements/FormElements/Button/Button';
import Card from '../../../shared/components/UIElements/Card';

import './Auth.scss';
import { UserContext } from '../../../shared/context/auth-context';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';

const Auth = () => {
  const [isLoginState, setIsLoginState] = useState(true);

  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const { login } = useContext(UserContext);
  const [formState, inputHandler, setInputData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginState) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        login(responseData.user.id);
      } catch (err) {}
    }
  };
  const toggleAuthState = () => {
    if (!isLoginState) {
      setInputData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid,
        formState.inputs.password.isValid
      );
    } else {
      setInputData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginState((prevState) => !prevState);
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginState ? 'Login' : 'Sign up'}</h2>
        <form onSubmit={authSubmitHandler}>
          {!isLoginState && (
            <Input
              id='name'
              type='text'
              placeholder='Name'
              label='Name'
              element='input'
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please provide a name'
            />
          )}
          <Input
            id='email'
            type='email'
            placeholder='Email'
            label='Email'
            element='input'
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
            errorText='Please provide a valid email address'
          />
          <Input
            id='password'
            type='password'
            placeholder='Password'
            label='Password'
            element='input'
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
            errorText='Password must be atleast 8 characters long'
          />
          <Button disabled={!formState.isValid}>
            {isLoginState ? 'Login' : 'Sign up'}{' '}
          </Button>
        </form>
        <Button inverse onClick={toggleAuthState}>
          {isLoginState ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </Fragment>
  );
};

export default Auth;
