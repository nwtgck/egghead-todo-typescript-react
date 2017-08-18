import {Link}              from "../components/Link";
import {connect}           from "react-redux";
import {Filter}            from "../actionCreators";
import * as actionCreators from '../actionCreators';


export const FilterLink = connect<{active: boolean}, {onClick: () => void}, {filter: Filter}>(
    (state, ownProps) => ({
        active: ownProps.filter == state.visibilityFilter
    }),
    (dispatch, ownProps) => ({
        onClick: () => {
            dispatch(actionCreators.setVisibilityFilter({
                filter: ownProps.filter
            }))
        }
    })
)(Link);