import React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { Constants } from 'expo';


export default class CityList extends React.Component {
    static navigationOptions = {
        title: 'Cities',
    };

    constructor(props) {
        super(props);

        this.state = {
            citites: [],
        }
    }

    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
            .then(response=>response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities
                });
            });
    }
    onPressCity(item) {
        console.log('onPressCity =', item);
        this.props.navigation.navigate('Detail');
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text style={styles.text}>{city}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return(
            <FlatList style={styles.container}
                      renderItem={({ item }) => this.renderItem(item)}
                      keyExtractor={item=>item}
                      data = {this.state.cities}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
    item: {
        flex: 1,
        height: 50,
        textAlign: 'center',

        borderColor: 'orange',
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});
