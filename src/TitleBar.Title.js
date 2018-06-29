'use strict'
import React, { Component } from 'react';
import { View, Text, Animated, TouchableWithoutFeedback,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
function renderTitle(title, i, selected) {
    var textStyle = {
        color:'#aaaaaa',
        fontSize:16
      };
      if (selected === i) {
          textStyle.color = '#333333'
      }
      return <Text style={textStyle}>{title}</Text>
}
class Title extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        borderStyle:PropTypes.any,
        rendetTitle:PropTypes.func,
        onItemPress: PropTypes.func
    }
    static defaultProps = {
        backgroundColor: '#fff',
        borderStyle: { height: 3, backgroundColor: '#2ca1aa' },
        renderTitle
    }
    constructor(...props) {
        super(...props);
        this.state = {
            page: this.props.initialPage,
            width: 0
        }
        this._scrollValue = new Animated.Value(this.props.initialPage);
    }
    onPageSelected(event) {
        var page = event.nativeEvent.position ;
        this.setState({ page });
        this._scrollValue.setValue(page);
    }
    onPageScroll(event) {
        var { offset, position } = event.nativeEvent;
        this._scrollValue.setValue(position + offset);
    }
    _renderTitle() {
        return this.props.titles.map((title, index) => {
            return <TouchableOpacity
                key = {index}
                onPress={() => this.props.onItemPress(index)}
                activeOpacity = {1}
                style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.backgroundColor }}
                children={this.props.renderTitle(title,index,this.state.page)} />
        });
    }
    _renderBorder() {
        if (!this.props.borderStyle) {
            return null;
        } else {
            let count = this.props.titles.length;
            let width = this.state.width / count;
            let left = this._scrollValue.interpolate({
                inputRange: [0, count],
                outputRange: [0, width * count]
            });
            let style = {
                width,
                position: 'absolute',
                bottom: 0,
                left,
                flex: null
            }
            return <Animated.View 
                        children={<View style={this.props.borderStyle}/>}
                        style={[style]} />
        }

    }
    _onLayout(e) {
        if (e.nativeEvent.layout.width !== this.state.width) {
            this.setState({ width: e.nativeEvent.layout.width })
        }
    }
    render() {
        if (!this.props.titles) {
            return null;
        }
        return <View
            onLayout={(e) => this._onLayout(e)}
            style={{ flexDirection: 'row', height: 60 }}>
            {this._renderTitle()}
            {this._renderBorder()}
        </View>
    }
}
export default Title;