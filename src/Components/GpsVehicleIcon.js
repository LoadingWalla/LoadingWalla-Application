import React from 'react';
import TruckNavigationIcon from '../../assets/SVG/svg/TruckNavigationIcon';

const VehicleIcon = ({category, size = 50, color = '#000'}) => {
  switch (category.toLowerCase()) {
    case 'truck':
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
    case 'car':
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
    case 'bus':
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
    case 'bike':
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
    case 'pickup':
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
    default:
      return <TruckNavigationIcon width={size} height={size} fill={color} />;
  }
};

export default VehicleIcon;
