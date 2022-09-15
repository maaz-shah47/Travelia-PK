import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlaceList } from '../components/PlaceList';
import { useHttpRequest } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const { userId } = useParams();

  useEffect(() => {
    const getUserPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (error) {}
    };
    getUserPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (placeId) => {
    setLoadedPlaces((prevState) => prevState.filter((p) => p.id !== placeId));
  };
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDelete={placeDeleteHandler} />
      )}
    </Fragment>
  );
};

export default UserPlaces;
