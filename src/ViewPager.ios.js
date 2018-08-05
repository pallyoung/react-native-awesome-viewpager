'use strict'
import React, { Component } from 'react';
import { View, ScrollView, ViewPagerAndroid } from 'react-native';

type Event = Object;

const ViewPagerScrollState = {
    idle: 'idle',
    dragging: 'dragging',
    settling: 'settling',
};
const VIEWPAGER_REF = 'viewPager';

class ViewPager extends Component {
    static propTypes = {
        ...ViewPagerAndroid.propTypes
    }
    constructor(...props) {
        super(...props);
        this.state = {
            height: 0,
            width: 0
        }
        this._pageSelected = this.props.initialPage;
        this._scrollState = ViewPagerScrollState.idle;
    }
    componentDidMount() {

    }

    _onLayout(e: Event) {
        var { width, height } = e.nativeEvent.layout;
        if (this.state.width != width || this.state.height != height) {
            this.setState({
                height,
                width
            })
        }
        this.props.onLayout && this.props.onLayout(e);
    }
    _onScroll(e) {
        var { x } = e.nativeEvent.contentOffset;
        var { width } = e.nativeEvent.layoutMeasurement;
        var contentWidth = e.nativeEvent.contentSize.width;
        var position = Math.floor(x / width);

        var offset = x / width - position;
        if (this._pageSelected != position && x % width == 0) {
            this._pageSelected = position;
            this.props.onPageSelected && this.props.onPageSelected({ nativeEvent: { position } });
            this._setScrollState(ViewPagerScrollState.idle);
        }
        this.props.onPageScroll && this.props.onPageScroll({ nativeEvent: { offset, position } });
    }

    _onPageSelected(e: Event){
        if (this.props.onPageSelected) {
            this.props.onPageSelected(e);
        }
    };
    _onTouchEnd(e: Event) {
        this._setScrollState(ViewPagerScrollState.settling);

    };
    _onTouchMove(e: Event){
        this._setScrollState(ViewPagerScrollState.dragging);
        
    };
    _setScrollState(scrollState:string){
        if(scrollState==this._scrollState){
            return;
        }
        this._scrollState = scrollState;
        this.props.onPageScrollStateChanged && this.props.onPageScrollStateChanged(scrollState);
    }
    // copy from facebook/react-native
    // https://github.com/facebook/react-native/blob/master/Libraries/Components/ViewPager/ViewPagerAndroid.android.js
    _childrenWithOverridenStyle ():Array{
        // Override styles so that each page will fill the parent. Native component
        // will handle positioning of elements, so it's not important to offset
        // them correctly.
        var {
            height,
            width
        } = this.state;
        return React.Children.map(this.props.children, function (child) {
            if (!child) {
                return null;
            }
            var newProps = {
                ...child.props,
                style: [child.props.style, {
                    width,
                    height,
                    flex: undefined
                }],
                collapsable: false,
            };
            if (child.type &&
                child.type.displayName &&
                (child.type.displayName !== 'RCTView') &&
                (child.type.displayName !== 'View')) {
                console.warn('Each ViewPager child must be a <View>. Was ' + child.type.displayName);
            }
            return React.cloneElement(child, newProps);
        });
    };
    /**
     * A helper function to scroll to a specific page in the ViewPager.
     * The transition between pages will be animated.
     */
    setPage (selectedPage: number) {
        this.refs[VIEWPAGER_REF].scrollTo({
            animated:true,
            x:selectedPage*this.state.width
        })

    };
    getInnerViewNode (): ReactComponent {

    };
    /**
     * A helper function to scroll to a specific page in the ViewPager.
     * The transition between pages will *not* be animated.
     */
    setPageWithoutAnimation (selectedPage: number){
        this.refs[VIEWPAGER_REF].scrollTo({
            animated:false,
            x:selectedPage*this.state.width
        });
    };
    render() {
        let childrenCount = React.Children.count(this.props.children);
        let initialPage = Math.min(Math.max(0, this.props.initialPage), childrenCount - 1);
        var { width } = this.state;
        let style = [
            this.props.style,
            {
                alignItems: undefined,
                justifyContent: undefined,
                flexDirection:'row'
            }
        ]
        if(this._pageSelected){
            initialPage = this._pageSelected;
        }
        let props = {
            showsHorizontalScrollIndicator: false,
            showsVerticalScrollIndicator: false,
            bounces: false,
            decelerationRate: 0.9,
            horizontal: true,
            pagingEnabled: true,
            scrollsToTop: false,
            ref: VIEWPAGER_REF,
            contentOffset: { x: width * initialPage, y: 0 },

            style,
            keyboardDismissMode: this.props.keyboardDismissMode,
            scrollEnabled: this.props.scrollEnabled,

            children: this._childrenWithOverridenStyle(),
            onLayout: (e) => this._onLayout(e),

            decelerationRate: 0.9,
            scrollEventThrottle: 8,
            onScroll: (e) => this._onScroll(e),
            onTouchEnd: (e) => this._onTouchEnd(e),
            onTouchMove: (e) => this._onTouchMove(e),
        }
        return <ScrollView
            {...props}
        />
    }
}
export default ViewPager;