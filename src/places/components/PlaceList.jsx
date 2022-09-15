import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/UIElements/FormElements/Button/Button';
import PlaceItem from './PlaceItem';

import './PlaceList.scss';

export const PlaceList = ({ items, onDelete }) => {
  if (items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No Places found! Maybe create one?</h2>
          <Button to='/places/new'>Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className='place-list'>
      {items.map(
        ({ id, title, description, address, creator, location, image }) => (
          <PlaceItem
            key={id}
            id={id}
            title={title}
            description={description}
            address={address}
            onDelete={onDelete}
            creatorId={creator}
          />
        )
      )}
    </ul>
  );
};
