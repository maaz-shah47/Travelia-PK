import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../shared/components/UIElements/Card';
import Avatar from '../../shared/components/UIElements/Avatar';

import './UsersItem.scss';

const UsersItem = ({ id, image, name, placeCount }) => {
  return (
    <li className='user-item'>
      <Card className='user-item__content'>
        <Link to={`/${id}/places`}>
          <div className='user-item__image'>
            <Avatar image={`http://localhost:5000/${image}`} name={name} />
          </div>
          <div className='user-item__info'>
            <h2> {name} </h2>
            <h3>
              {' '}
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}{' '}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UsersItem;
