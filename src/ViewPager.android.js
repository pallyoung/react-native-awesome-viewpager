'use strict'
import {ViewPagerAndroid} from 'react-native';


class ViewPager extends ViewPagerAndroid{
    static propTypes = {
        ...ViewPagerAndroid.propTypes,
    }
    constructor(...props){
        super(...props);

        this._setPageWithoutAnimation = this.setPageWithoutAnimation;
        this._setPage = this.setPage;
        this.setPageWithoutAnimation = function(position){
            this._setPageWithoutAnimation(position);
            this.props.onPageSelected && this.props.onPageSelected({ nativeEvent: { position } });
        }
        this.setPage = function(position){
            this._setPage(position);
            this.props.onPageSelected && this.props.onPageSelected({ nativeEvent: { position} });
        }
    }
}
export default ViewPager;