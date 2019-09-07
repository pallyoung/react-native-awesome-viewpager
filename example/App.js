/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Swiper, TitleBar, TabBar } from 'react-native-awesome-viewpager';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  state = {
    scrollEnabled: true,
    type: 1,
  }

  render() {
    switch (this.state.type) {
      case 1:
        return (
          <Swiper
            ref='ViewPager'
            loop={true}
            autoplay={false}
            interval={2000}
            scrollEnabled={this.state.scrollEnabled}
            style={styles.container}>
            <View style={{ backgroundColor: 'red', padding: 60 }}>
              <Text
                onPress={() => this.refs.ViewPager.setPage(1)}>滚动</Text>
              <Text
                onPress={() => this.setState({ scrollEnabled: false })}>禁止滚动</Text>
              <Text
                onPress={() => this.setState({ scrollEnabled: true })}>允许滚动</Text>
            </View>
            <View style={{ backgroundColor: 'blue', padding: 60 }}>
              <Text
                onPress={() => this.refs.ViewPager.setPageWithoutAnimation(0)}>滚动</Text>
            </View>
            <View style={{ backgroundColor: '#448811', padding: 60 }}>
              <Text
                onPress={() => this.refs.ViewPager.setPageWithoutAnimation(0)}>page 3</Text>
            </View>
            <View style={{ backgroundColor: '#226677', padding: 60 }}>
              <Text
                onPress={() => this.refs.ViewPager.setPageWithoutAnimation(0)}>page 4</Text>
            </View>
          </Swiper >
        );
      case 2:
        return <TitleBar
          style={styles.container}
          titles={['Page 1', 'Page 2', 'Page 3']}>
          <View>
            <Text>Page 1</Text>
          </View>
          <View>
            <Text>Page 2</Text>
          </View>
          <View>
            <Text>Page 3</Text>
          </View>
        </TitleBar>
      case 3:
        return <TabBar
          style={styles.container}
          tabs={[{
            text: 'Page 1',
            icon: require('./icon/Bubble.png'),
            selectedIcon: require('./icon/Green-Bubble.png')
          }, {
            text: 'Page 2',
            icon: require('./icon/TabBar-Contacts-Outline.png'),
            selectedIcon: require('./icon/TabBar-Contacts-Green.png'),
          }, {
            text: 'Page 3',
            icon: require('./icon/TabBar-Discover-Outline.png'),
            selectedIcon: require('./icon/TabBar-Discover-Green.png'),
          },
          {
            text: 'Page 4',
            icon: require('./icon/TabBar-Me-Outline.png'),
            selectedIcon: require('./icon/TabBar-Me-Green.png'),
          }]}>
          <View>
            <Text>Page 1</Text>
          </View>
          <View>
            <Text>Page 2</Text>
          </View>
          <View>
            <Text>Page 3</Text>
          </View>
          <View>
            <Text>Page 4</Text>
          </View>
        </TabBar>
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efdeed',
    flexDirection: 'column',
    paddingTop: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
