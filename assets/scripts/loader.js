import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import styles from './styles';

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isFetching: false,
            hasMoreItems: true,
            visibleItems: [],
        };
    }

    componentDidMount() {
        this.loadMoreItems();
    }

    loadMoreItems = () => {
        const { data } = this.props;
        const { page, isFetching, hasMoreItems } = this.state;
        const itemsPerPage = 5; // Number of items to display per page

        if (!isFetching && hasMoreItems) {
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
        }
    };

    handleLoadMore = () => {
        this.loadMoreItems();
    };

    render() {
        const { renderItem, ...otherProps } = this.props;
        const { visibleItems } = this.state;

        return (
            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={visibleItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
                {...otherProps}
                ListEmptyComponent={() => (
                    <Text style={styles.noItems}>No se encontraron resultados</Text>
                )}
            />
        );
    }
}

export default Loader;