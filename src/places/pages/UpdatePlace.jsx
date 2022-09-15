import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../../shared/components/UIElements/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validator';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import { useForm } from '../../shared/hooks/form-hook';
import Card from '../../shared/components/UIElements/Card';
import { useHttpRequest } from '../../shared/hooks/http-hook';

import './Place.scss';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { UserContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedPlace, setLoadedPlace] = useState();

  const { placeId } = useParams();
  const history = useHistory();
  const { userId } = useContext(UserContext);

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

  useEffect(() => {
    const getPlaceById = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setInputData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    getPlaceById();
  }, [sendRequest, placeId, setInputData]);

  if (!loadedPlace && !error) {
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
        <LoadingSpinner />
      </div>
    );
  }
  const updateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
        }
      );
      history.push('/' + userId + '/places');
    } catch (error) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form onSubmit={updateSubmitHandler} className='place-form'>
          <Input
            id='title'
            element='input'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title!!'
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={loadedPlace.title}
          />
          <Input
            id='description'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (atleast 5 characters)'
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={loadedPlace.description}
          />

          <Button type='submit' disabled={!formState.isValid}>
            Update Place
          </Button>
        </form>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
