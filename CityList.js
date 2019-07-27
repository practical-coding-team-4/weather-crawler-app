import React from 'react';
import { TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';


export default class CityList extends React.Component {
    static navigationOptions = {
        title: 'Cities',
    };

    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            search: '',
            loading: false,
        }
    }

    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
            .then(response=>response.json())
            .then(cities => {
                console.log('cities =', cities.length);
                this.setState({
                    cities,
                    data: cities
                });
            });
    }
    onPressCity(item) {
        console.log('onPressCity =', item);
        this.props.navigation.navigate(
            'Detail',
            {
                city: item
            }
        );
    }

    renderItem(city) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this.onPressCity(city)}>
                <Text style={styles.text}>{city}</Text>
            </TouchableOpacity>
        );
    }

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Type Here..."
                value={this.state.value }
                onChangeText={text => this.searchFilterFunction(text) }
            />
        )
    };

    searchFilterFunction = text => {
        this.setState({
            value: text
        });

        const newData = this.state.cities.filter(city => {
            const cityData = city.toUpperCase();
            const textData = text.toUpperCase();
            return cityData.includes(textData);
        });

        this.setState({
            data: newData
        });
    };

    render() {
        const {search} = this.state;

        return(
                <FlatList
                    style={styles.container}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={item=>item}
                    data = {this.state.data}
                    extraData = {this.state}
                    ListHeaderComponent={this.renderHeader}
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
