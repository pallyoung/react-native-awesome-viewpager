'use strict';

import React, { Component } from 'react';
import {View} from 'react-native';
import ViewPager from './ViewPager';
import PropTypes from 'prop-types';
import Indicator from './Swiper.Indicator';

const VIEWPAGER_REF = 'VIEWPAGER';
const INDICATOR_REF = 'INDICATOR_REF';

class Swiper extends Component {
    static propTypes = {
        ...ViewPager.propTypes,
        loop: PropTypes.bool,
        autoplay: PropTypes.bool,
        interval: PropTypes.number,
        indicator:PropTypes.bool
    };

    static defaultProps = {
        initialPage: 0,
        interval: 5000,
        loop: false,
        autoplay: false,
        keyboardDismissMode: 'on-drag',
        scrollEnabled: true,
        indicator:true
    };
    constructor(...props) {
        super(...props);
        this.state = {

        }
        this._pageCount = 0;
        this._selected = 0;

        this._timeout
    }
    componentDidMount() {
        if (this.props.autoplay) {
            this._play();
        }
    }
    componentWillReceiveProps(nextProps) {

    }

    componentWillUnmount() {
        this._stop();
    }

    _play() {
        this._timeout = setTimeout(() => {
            clearTimeout(this._timeout);
            var page = this._page(this._selected) + 1;
            this.setPage(page);
            this._play();
        }, this.props.interval);
    }
    _stop() {
        clearTimeout(this._timeout);
    }

    _onPageScrollStateChange(state){
        if(state!=='idle'){
            this._stop();
        }else if(this.props.autoplay){
            this._play();
        }
        this.props.onPageScrollStateChanged&&this.props.onPageScrollStateChanged(state);
    }
    _onPageSelected(e) {
        var { position } = e.nativeEvent;
        var page = this._page(position);
        this._selected = position;
        if (this.props.loop && this._pageCount > 1) {
            if (position == 0) {
                this.setPageWithoutAnimation(this._pageCount - 1)
            } else if (position == this._pageCount + 1) {
                this.setPageWithoutAnimation(0)
            }
        }
        var outerEvent = { nativeEvent: { position: page } };
        this.refs[INDICATOR_REF]&&this.refs[INDICATOR_REF].onPageSelected(outerEvent)
        this.props.onPageSelected && this.props.onPageSelected(outerEvent);
    }
    _onPageScroll(e) {
        var { position, offset } = e.nativeEvent;
        var page = this._page(position);
        var outerEvent = { nativeEvent: { position: page, offset } };
        this.refs[INDICATOR_REF]&&this.refs[INDICATOR_REF].onPageScroll(outerEvent);
        this.props.onPageScroll && this.props.onPageScroll(outerEvent);
    }
    _position(page: number): number {
        if (this.props.loop && this._pageCount > 1) {
            page++;
        }
        return page;
    }
    _page(position: number): number {
        if (this.props.loop && this._pageCount > 1) {
            if (position == 0) {
                position = this._pageCount - 1;
            } else if (position == this._pageCount + 1) {
                position = 0;
            } else {
                position--;
            }
        }
        return position;
    }

    setPageWithoutAnimation(selectedPage: number) {
        selectedPage = this._position(selectedPage);
        this.refs[VIEWPAGER_REF].setPageWithoutAnimation(selectedPage);
    }

    setPage(selectedPage: number) {
        selectedPage = this._position(selectedPage);
        this.refs[VIEWPAGER_REF].setPage(selectedPage);
    }

    render() {
        var { children, initialPage } = this.props;
        var childrenCount = React.Children.count(children);
        this._pageCount = childrenCount;

        if (this.props.loop && childrenCount > 1) {
            var first = children[0];
            var last = children[childrenCount - 1];
            first = React.createElement(first.type, first.props);
            last = React.createElement(last.type, last.props);
            children = React.Children.map(children, function (child) {
                return child;
            })
            children.push(first);
            children.unshift(last);
            initialPage++;
        }
        this._selected = initialPage;
        var viewpagerProps = {
            ...this.props,
            onPageSelected: (e) => this._onPageSelected(e),
            onPageScroll: (e) => this._onPageScroll(e),
            onPageScrollStateChange:(state)=>this._onPageScrollStateChange(state),
            children,
            initialPage,
            ref: VIEWPAGER_REF,
            style: { flex: 1 }
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
            onLayout={this.props.onLayout} >
            <ViewPager
                {...viewpagerProps} />
            {this.props.indicator&&<Indicator
                ref = {INDICATOR_REF}
                initialPage = {this.props.initialPage}
                count={childrenCount} />}
        </View>


    }

}

export default Swiper;