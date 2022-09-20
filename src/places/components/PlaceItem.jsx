import React, { Fragment, useContext, useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Modal from '../../shared/components/UIElements/Modal';
import { UserContext } from '../../shared/context/auth-context';
import { useHttpRequest } from '../../shared/hooks/http-hook';

import './PlaceItem.scss';

const PlaceItem = ({
  id,
  title,
  description,
  address,
  image,
  onDelete,
  creatorId,
}) => {
  console.log(image);
  const { userId } = useContext(UserContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpRequest();

  const showMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  const openDeleteModalHandler = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModalHandler = () => {
    setShowDeleteModal(false);
  };
  const confirmDeleteHandler = async () => {
    setShowDeleteModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/places/${id}`, 'DELETE');
      onDelete(id);
    } catch (error) {}
  };
  const FooterButton = <Button onClick={closeMapHandler}>Close</Button>;
  const FooterDelete = (
    <Fragment>
      <Button inverse onClick={closeDeleteModalHandler}>
        Close
      </Button>
      <Button danger onClick={confirmDeleteHandler}>
        Delete
      </Button>
    </Fragment>
  );

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        handleClose={closeMapHandler}
        header={address}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={FooterButton}
      >
        <div className='map-container'>
          <h2>Map</h2>
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        header={title}
        handleClose={closeDeleteModalHandler}
        contentClass='place-item__modal-content'
        footerClass='place-item__modal-actions'
        footer={FooterDelete}
      >
        <p>Are you sure you want to delete this place?</p>
      </Modal>
      <li className='place-item'>
        <Card className='place-item__content'>
          {isLoading && <LoadingSpinner />}
          <div className='place-item__image'>
            <img src={`http://localhost:5000/${image}`} alt={title} />
          </div>
          <div className='place-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='place-item__actions'>
            <Button onClick={showMapHandler} inverse>
              VIEW ON MAP
            </Button>
            {userId === creatorId && <Button to={`/places/${id}`}>EDIT</Button>}
            {userId === creatorId && (
              <Button danger onClick={openDeleteModalHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
