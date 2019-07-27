import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font'
import Weather from './Weather';

export default class WeatherDetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            fontLoaded:false,
            temperature: 0,
            weatherCondition: null,
        };
    }

    async componentDidMount() {
        await Font.loadAsync({
            'BMHANNA_11yrs': require('./assets/fonts/BMHANNA_11yrs.ttf'),
          });
        this.setState({ fontLoaded: true });


        const { navigation } = this.props;
        const city = 'Daejeon';

         fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({
                    ...info,
                    temperature: info.main.temp,
                    weatherCondition: info.weather[0].main,
                    isLoading: false,
                });
            });

    }

    render() {
        if(this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text>데이터를 불러오는 중입니다.</Text>
                </View>
            )
        }

        let celsius = this.state.main.temp - 273.15;
        let icon = this.state.weather[0].icon;
        let cityName = this.state.name;
        let weatherCondition = this.state.weatherCondition;
        let temperature = this.state.temperature - 273.11;

        console.log("icon is " + icon);

        if(this.state.fontLoaded){
            return (
                <View style={styles.container}>
                     <Weather weather={weatherCondition} temperature={temperature} cityName={cityName}/>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    default_text: {
        fontSize: 50,
        fontFamily :'BMHANNA_11yrs',
    },
    celsius_text:{
        fontSize : 65,
        fontWeight : "bold",
        fontStyle : "italic",
    },
    give_margin:{
        marginTop : 40,
    }
});


