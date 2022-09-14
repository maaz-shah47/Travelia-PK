import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DUMMY_PLACES } from './UserPlaces';
import Input from '../../shared/components/UIElements/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';

import './Place.scss';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  const [formState, inputHandler, setInputData] = useForm(
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

  const identifiedPlace = DUMMY_PLACES.find(
    (place) => place.id === params.placeId
  );

  useEffect(() => {
    if (identifiedPlace) {
      setInputData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
          address: {
            value: identifiedPlace.address,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [identifiedPlace, setInputData]);

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <Card>
          <h2>No Place found!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='center'>
        <h2>Loading...</h2>
      </div>
    );
  }
  const updateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <form onSubmit={updateSubmitHandler} className='place-form'>
      <Input
        id='title'
        element='input'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title!!'
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id='description'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description (atleast 5 characters)'
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id='address'
        element='input'
        label='Address'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid address!!'
        onInput={inputHandler}
        initialValue={formState.inputs.address.value}
        initialValid={formState.inputs.address.isValid}
      />
      <Button type='submit' disabled={!formState.isValid}>
        Update Place
      </Button>
    </form>
  );
};

export default UpdatePlace;
