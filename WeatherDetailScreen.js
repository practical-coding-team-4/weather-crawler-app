import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo';

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
        };
    }

    componentDidMount() {
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
        console.log("icon is " + icon);

        return (
            <View style={styles.container}>
                <Text>날씨</Text>
                <Image
                    style={{width: 150, height: 150}}
                    source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}} />
                <Text>온도: {celsius.toFixed(1)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
});
