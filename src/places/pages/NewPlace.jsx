import React from 'react';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/components/UIElements/FormElements/Input';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';

import './Place.scss';

const NewPlace = () => {
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
    },
    false
  );

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <form onSubmit={formSubmitHandler} className='place-form'>
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
      <Button disabled={!formState.isValid}>Add Place</Button>
    </form>
  );
};

export default NewPlace;
