import React from 'react';
import CityList from './CityList';
import WeatherDetailScreen from './WeatherDetailScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const AppNavigator = createStackNavigator(
    {
    CityList: CityList,
    Detail: WeatherDetailScreen,
    },
    {
        initialRouteName: 'CityList',
    }
);

export default createAppContainer(AppNavigator);
