export const calculateSignalStrength = cellTowers => {
  // You can use some logic based on `cellId`, `locationAreaCode`, etc.
  // Here's a simple example assuming the presence of cell towers gives good signal
  // You can adjust the logic based on real-world calculations if you have more data

  if (cellTowers && cellTowers.length > 0) {
    // Assume a good signal if `cellId` is available
    const {cellId} = cellTowers[0];

    // Example logic: stronger signal if `cellId` is higher or in a valid range
    if (cellId > 20000) {
      return 80; // Strong signal
    } else if (cellId > 10000) {
      return 50; // Medium signal
    } else {
      return 20; // Weak signal
    }
  }

  // Default weak signal if no cell towers
  return 0;
};
