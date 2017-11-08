'use strict'
import React, { Component } from 'react';
import { View, Image, Text, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
function renderTab(tab, i, page) {
    var source = i == page ? tab.selectedIcon : tab.icon;
    var textStyle = {
        fontSize: 12,
        color: '#7a7e83',
        height: 16,
        lineHeight: 16,
        marginTop: 5
    }
    if (i == page) {
        textStyle.color = '#27b24a';
    }
    return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={source} resizeMode='stretch' />
        {tab.text && <Text
            style={textStyle}>{tab.text}</Text>}
    </View>
}
class Tab extends Component {
    static propTypes = {
        backgroundColor: PropTypes.string,
        tabs: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            icon: PropTypes.any,
            selectedIcon: PropTypes.any,
        })),
        renderTab: PropTypes.func,
        onItemPress: PropTypes.func

    }
    static defaultProps = {
        backgroundColor: '#fff',
        renderTab
    }
    constructor(...props) {
        super(...props);
        this.state = {
            page: this.props.initialPage
        }
    }
    onPageSelected(event) {
        var page = event.nativeEvent.position;
        this.setState({ page, });
    }
    onPageScroll(event) {
    }
    _renderItem() {
        return this.props.tabs.map((tab, i) => {
            var { page } = this.state;
            return <TouchableOpacity
                style={{ flex: 1 }}
                activeOpacity={1}
                key={i}
                onPress={() => this.props.onItemPress(i)} >
                {this.props.renderTab(tab, i, page)}
            </TouchableOpacity>
        })
    }
    render() {
        if (!this.props.tabs) {
            return null;
        }
        return <View style={{ flexDirection: 'row', height: 60, backgroundColor: this.props.backgroundColor }}>
            {this._renderItem()}
        </View>
    }
}

export default Tab;