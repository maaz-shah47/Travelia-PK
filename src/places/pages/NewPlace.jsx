import React, { Fragment, useContext } from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/UIElements/FormElements/Input';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';
import ImageUpload from '../../shared/components/UIElements/FormElements/ImageUpload';
import { useHttpRequest } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { UserContext } from '../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

import './Place.scss';

const NewPlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const history = useHistory();
  const { userId, token } = useContext(UserContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('creator', userId);
      formData.append('image', formState.inputs.image.value);
      await sendRequest('http://localhost:5000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + token,
      });
      history.push('/');
    } catch (error) {}
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={formSubmitHandler} className='place-form'>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          label='Title'
          type='text'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid text!!'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText='Please enter a valid description (atleast 5 characters)'
          onInput={inputHandler}
        />
        <Input
          id='address'
          element='input'
          label='Address'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid address'
          onInput={inputHandler}
        />
        <ImageUpload
          id='image'
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <Button disabled={!formState.isValid}>Add Place</Button>
      </form>
    </Fragment>
  );
};

export default NewPlace;
