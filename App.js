import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Constants } from 'expo';


export default class App extends React.Component {
    componentDidMount() {
        fetch('http://demo6468405.mockable.io/weather-crawlers/cities')
            .then(response=>response.json())
            .then(console.log);
    }
    renderItem({ name }) {
        return (
            <View style={styles.item}>
                <Text style={styles.text}>{name}</Text>
            </View>
        );
    }

    render() {
        return(
            <FlatList style={styles.container}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={(item)=>item.name}
                data = {this.fruits}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        borderColor: 'orange',

        marginTop: Constants.statusBarHeight,
        borderWidth: 1,
    },
    item: {
        fontSize : 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});
