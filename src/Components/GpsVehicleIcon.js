import React from 'react';
import DefaultGpsIcon from '../../assets/SVG/svg/DefaultGpsIcon';
import PickUpIcon from '../../assets/SVG/svg/PickUpIcon';
import BikeGpsIcon from '../../assets/SVG/svg/BikeGpsIcon';
import BusGpsIcon from '../../assets/SVG/svg/BusGpsIcon';
import CarGpsIcon from '../../assets/SVG/svg/CarGpsIcon';
import TruckGpsIcon from '../../assets/SVG/svg/TruckGpsIcon';

const VehicleIcon = ({category, size = 50}) => {
  switch (category.toLowerCase()) {
    case 'truck':
      return <TruckGpsIcon width={size} height={size} />;
    case 'car':
      return <CarGpsIcon width={size} height={size} />;
    case 'bus':
      return <BusGpsIcon width={size} height={size} />;
    case 'motorcycle':
      return <BikeGpsIcon width={size} height={size} />;
    case 'pickup':
      return <PickUpIcon width={size} height={size} />;
    default:
      return <DefaultGpsIcon width={size} height={size} />;
  }
};

export default VehicleIcon;
