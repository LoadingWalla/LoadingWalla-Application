import React from 'react';
import TruckNavigationIcon from '../../assets/SVG/svg/TruckNavigationIcon';
import DefaultGpsIcon from '../../assets/SVG/svg/DefaultGpsIcon';
import PickUpIcon from '../../assets/SVG/svg/PickUpIcon';
import BikeGpsIcon from '../../assets/SVG/svg/BikeGpsIcon';
import BusGpsIcon from '../../assets/SVG/svg/BusGpsIcon';
import CarGpsIcon from '../../assets/SVG/svg/CarGpsIcon';

const VehicleIcon = ({category, size = 50, color = '#000'}) => {
  switch (category.toLowerCase()) {
    case 'truck':
      return <CarGpsIcon width={size} height={size} fill={color} />;
    case 'car':
      return <CarGpsIcon width={size} height={size} fill={color} />;
    case 'bus':
      return <BusGpsIcon width={size} height={size} fill={color} />;
    case 'bike':
      return <BikeGpsIcon width={size} height={size} fill={color} />;
    case 'pickup':
      return <PickUpIcon width={size} height={size} fill={color} />;
    default:
      return <DefaultGpsIcon width={size} height={size} fill={color} />;
  }
};

export default VehicleIcon;
