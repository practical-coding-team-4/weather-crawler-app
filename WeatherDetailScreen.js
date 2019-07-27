import React from 'react';
import { Image, StyleSheet, View, Text, Button, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font'

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

        console.log("icon is " + icon);

        if(this.state.fontLoaded){
            return (
                <View style={styles.container}>
                    <Text style={[styles.default_text,styles.give_margin]}>현재 날씨는</Text>
                    <Image
                        style={{width: 200, height:200}}
                        source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}} />
                    <Text style={styles.default_text}>현재 온도는</Text>
                    <Text style={[styles.celsius_text,styles.give_margin]}>{celsius.toFixed(1)} ℃</Text>
                    <Button title={'자세한 정보'} onPress={()=>Linking.openURL(
                        `https://openweathermap.org/find?q=${cityName}`
                    )} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
        alignItems : 'center',
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


