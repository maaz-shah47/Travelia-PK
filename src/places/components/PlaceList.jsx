import React from 'react'
import Card from '../../shared/components/UIElements/Card'
import PlaceItem from './PlaceItem'

import './PlaceList.scss'

export const PlaceList = ({items}) => {
  if(items.length === 0) {
    return (
      <div className='place-list center'>
        <Card>
          <h2>No Places found! Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    )
  }

  return (
    <ul className='place-list'>
      {items.map( ({id, title, description, address, creator, location, imageUrl}) => (
        <PlaceItem
          key={id}
          id={id}
          image={imageUrl}
          title={title}
          description={description}
          address={address}
          creatorId={creator}
          coordinates={location}
        />
      ))}
    </ul>
  )
}
