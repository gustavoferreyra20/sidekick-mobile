import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Dimensions } from 'react-native';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleItems: [],
            page: 1,
            isFetching: false,
            hasMoreItems: true,
        };
    }

    componentDidMount() {
        this.loadMoreItems();
    }

    loadMoreItems = () => {
        const { data } = this.props;
        const { page, visibleItems } = this.state;
        const itemsPerPage = 5; // Number of items to display per page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const nextItems = data.slice(startIndex, endIndex);

        if (nextItems.length > 0) {
            this.setState((prevState) => ({
                visibleItems: [...prevState.visibleItems, ...nextItems],
                page: prevState.page + 1,
                isFetching: false,
            }));
        } else {
            // If there are no more items to show, set hasMoreItems to false to stop the infinite loop
            this.setState({ hasMoreItems: false, isFetching: false });
        }
    };

    handleLoadMore = () => {
        const { isFetching, hasMoreItems } = this.state;
        if (!isFetching && hasMoreItems) {
            this.setState(
                {
                    isFetching: true,
                },
                () => {
                    this.loadMoreItems();
                }
            );
        }
    };

    render() {
        const { renderItem, ...otherProps } = this.props;
        const { visibleItems } = this.state;

        return (
            <FlatList
                data={visibleItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
                {...otherProps}
            />
        );
    }
}

export default Loader;