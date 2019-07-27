import React from 'react';
import { View, Text, Button, StyleSheet, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font'
import PropTypes from 'prop-types';
import { weatherConditions } from './WeatherConditions';

Font.loadAsync({
  'BMHANNA_11yrs': require('./assets/fonts/BMHANNA_11yrs.ttf'),
});


const Weather = ({ weather, temperature, cityName }) => {
  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: weatherConditions[weather].color }
      ]}
    >
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons
          size={72}
          name={weatherConditions[weather].icon}
          color={'#fff'}
        />
        <Text style={styles.tempText}>{temperature}˚</Text>
      </View>
      <View style={styles.bodyContainer}>
      <Button title={'Details'} onPress={()=>Linking.openURL(
                        `https://openweathermap.org/find?q=${cityName}`
                      )} />
        <Text style={styles.title}>{weatherConditions[weather].title}</Text>
        <Text style={styles.subtitle}>
          {weatherConditions[weather].subtitle}
        </Text>
      </View>
    </View>
  );
};

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
};

const styles = StyleSheet.create({

  weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  tempText: {
    fontSize: 72,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    marginTop : 10,
    fontSize: 60,
    fontFamily :'BMHANNA_11yrs',
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    fontFamily :'BMHANNA_11yrs',
    color: '#fff'
  }
});

export default Weather;