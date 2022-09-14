import React, { Fragment, useContext, useState } from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { UserContext } from '../../shared/context/auth-context';

import './PlaceItem.scss';

const PlaceItem = ({
  id,
  title,
  description,
  address,
  creatorId,
  coordinates,
  image,
}) => {
  const { isLoggedIn } = useContext(UserContext);
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
  const confirmDeleteHandler = () => {
    setShowDeleteModal(false);
    console.log('DELETING...');
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
          <div className='place-item__image'>
            <img src={image} alt={title} />
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
            {isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
            {isLoggedIn && (
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
