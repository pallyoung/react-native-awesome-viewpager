'use script'
import ViewPager from './ViewPager';
import React, { Component } from 'react';
import { Animated, View, Text } from 'react-native'
import PropTypes from 'prop-types';
import Title from './TitleBar.Title';

const TITLE_REF = 'TITLE';
const VIEWPAGER_REF = 'VIEWPAGER';
class TitleBar extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        ...Title.propTypes
    }
    static defaultProps = {
        initialPage:0
    }
    constructor(...props) {
        super(...props);
    }
    _onPageScroll(e) {
        this.refs[TITLE_REF] && this.refs[TITLE_REF].onPageScroll(e);
        this.props.onPageScroll && this.props.onPageScroll(e);
    }
    _onPageSelected(e) {
        this.refs[TITLE_REF] && this.refs[TITLE_REF].onPageSelected(e);
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
             onPageSelected:(e)=>this._onPageSelected(e),
             onPageScroll:(e)=>this._onPageScroll(e)
        }
        var style = [
            this.props.style,
            {
                flexDirection:'column',
                justifyContent:undefined,
                alignItems:undefined
            }
        ]
        return <View
            style={style}
            onLayout={this.props.onLayout}
        >
            <Title
                ref={TITLE_REF}
                backgroundColor={this.props.backgroundColor}
                renderTitle = {this.props.renderTitle}
                borderStyle={this.props.borderStyle}
                onItemPress={(position) => this._onItemPress(position)}
                initialPage={this.props.initialPage}
                titles={this.props.titles} />
            <ViewPager
                ref={VIEWPAGER_REF}
                {...viewpagerProps} />
        </View>
    }
}

export default TitleBar;