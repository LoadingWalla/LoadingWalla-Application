import moment from 'moment';

export const convertToCSV = data => {
  const headers = [
    'Device ID',
    'Device Name',
    'Distance (KM)',
    'Average Speed (km/h)',
    'Max Speed (km/h)',
    'Spent Fuel',
    'Start Odometer',
    'End Odometer',
    'Start Time',
    'End Time',
    'Duration',
    'Start Latitude',
    'Start Longitude',
    'End Latitude',
    'End Longitude',
    'Start Address',
    'End Address',
  ];

  const rows = data.map(item => [
    item.deviceId,
    item.deviceName,
    (item.distance / 1000).toFixed(2), // Distance in KM
    (item.averageSpeed * 1.852).toFixed(2), // Speed converted to KM/H
    (item.maxSpeed * 1.852).toFixed(2), // Max Speed converted to KM/H
    item.spentFuel || 0.0,
    item.startOdometer || '',
    item.endOdometer || '',
    moment(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
    moment(item.endTime).format('YYYY-MM-DD HH:mm:ss'),
    convertMillisToTime(item.duration),
    item.startLat || '',
    item.startLon || '',
    item.endLat || '',
    item.endLon || '',
    item.startAddress || '',
    item.endAddress || '',
  ]);

  let csvContent = headers.join(',') + '\n';
  csvContent += rows.map(row => row.join(',')).join('\n');

  return csvContent;
};

const convertMillisToTime = millis => {
  const hours = Math.floor(millis / (1000 * 60 * 60));
  const minutes = Math.floor((millis % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};
