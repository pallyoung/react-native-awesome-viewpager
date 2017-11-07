'use script'
import React, { Component } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import ViewPager from './ViewPager';
import Tab from './TabBar.Tab';
const TAB_REF = 'TAB_REF';
const VIEWPAGER_REF = 'VIEWPAGER_REF';


class TabBar extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        ...Tab.propTypes,
    }
    static defaultProps = {
        initialPage:0
    }
    constructor(...props) {
        super(...props);
    }
    _onPageScroll(e) {
        this.refs[TAB_REF] && this.refs[TAB_REF].onPageScroll(e);
        this.props.onPageScroll && this.props.onPageScroll(e);
    }
    _onPageSelected(e) {
        this.refs[TAB_REF] && this.refs[TAB_REF].onPageSelected(e);
        this.props.onPageSelected && this.props.onPageSelected(e);
    }
    _onItemPress(position) {
        this.refs[VIEWPAGER_REF] && this.refs[VIEWPAGER_REF].setPageWithoutAnimation(position);
    }
    setPage(selectedPage: number) {
        this.refs[VIEWPAGER_REF].setPage(selectedPage);
    }
    setPageWithoutAnimation(selectedPage: number) {
        this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
    }
    render() {
        var viewpagerProps = {
            ...this.props,
            style: {
                flex: 1
            },
            onPageSelected: (e) => this._onPageSelected(e),
            onPageScroll: (e) => this._onPageScroll(e)
        }
        var style = [
            this.props.style,
            {
                flexDirection: 'column',
                justifyContent: undefined,
                alignItems: undefined
            }
        ]
        return <View
                style={style}
                onLayout={this.props.onLayout}
            >
            <ViewPager
                ref={VIEWPAGER_REF}
                {...viewpagerProps} />
            <Tab
                ref={TAB_REF}
                backgroundColor={this.props.backgroundColor}
                renderTab = {this.props.renderTab}
                onItemPress={(position) => this._onItemPress(position)}
                initialPage={this.props.initialPage}
                tabs={this.props.tabs} />
        </View>
    }
}
export default TabBar;