import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PrivacyPolicy, white} from '../Color/color';

const CommonItem = ({item, color}) => {
  // console.log(8888888, item);
  const date = new Date(item?.updated_at);
  const now = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = now.getTime() - date.getTime();

  // Convert milliseconds to minutes, hours, and days
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Decide the display format based on the time difference
  let displayDate;
  if (minutesDifference < 60) {
    displayDate = `${minutesDifference} min ago`;
  } else if (hoursDifference < 24) {
    displayDate = `${hoursDifference} hours ago`;
  } else if (daysDifference < 7) {
    displayDate = `${daysDifference} days ago`;
  } else {
    // If more than 7 days, format as MM/DD/YYYY
    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    displayDate = formattedDate;
  }

  return (
    <View style={styles.notificationItemView(color)}>
      <View style={styles.textBox}>
        <Text numberOfLines={1} style={styles.notificationTitle(color)}>
          {item?.body}
        </Text>
        <Text numberOfLines={1} style={styles.notitficationDesc}>
          {item?.message}
        </Text>
      </View>
      <View style={styles.NotificationTime}>
        <Text style={styles.NotificationText}>{displayDate}</Text>
      </View>
    </View>
  );
};
export default CommonItem;

const styles = StyleSheet.create({
  notificationItemView: color => ({
    backgroundColor: white,
    borderRadius: 5,
    flexDirection: 'column',
    elevation: 2,
    margin: 5,
    padding: 10,
    borderLeftWidth: 10,
    borderColor: 'green',
  }),
  textBox: {},
  notificationTitle: color => ({
    fontSize: 14,
    color: 'green',
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'left',
  }),
  notitficationDesc: {
    fontSize: 12,
    color: PrivacyPolicy,
    fontWeight: '400',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  NotificationTime: {
    // borderWidth: 1,
  },
  NotificationText: {
    textAlign: 'right',
    fontFamily: 'PlusJakartaSans-Light',
    fontSize: 10,
    color: PrivacyPolicy,
  },
});
