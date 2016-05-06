import React from 'react';
import Link from '../presenters/link';

export default class FilterLink extends React.Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWilUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children } = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link
        active={
          filter === state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }
      >
        {children}
      </Link>
    )
  }
}

FilterLink.contextTypes = {
  store: React.PropTypes.object
};
