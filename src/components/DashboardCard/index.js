import * as React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function DashboardCard({image}) {
  return (
    <div className='cardContentLayout'>
        <div className='cardImageIcon'>
          <img src={image.img} alt={image.name}/>
        </div>
        <div className='cardContentDetails'>
          <div className='cardDetailsText'>
          <p className='sectionLabel'>Name:</p>
          <p className='sectionValue'>{image.name}</p>
          </div>
          <div className='cardDetailsText'>
            <p className='sectionLabel'>Number:</p>
            <p className='sectionValue'>{image.num}</p>
          </div>
          <div className='cardDetailsText'>
            <p className='sectionLabel'>Type:</p>
            <p className='sectionValue'>{image.type.join(', ')}</p>
          </div>
          <div className='cardDetailsText'>
            <p className='sectionLabel'>Weakness:</p>
            <p className='sectionValue'>{image.weaknesses.join(', ')}</p>
          </div>
        </div>
    </div>
  );
}

DashboardCard.propTypes = {
    image : PropTypes.object.isRequired,
}

export default DashboardCard ;
