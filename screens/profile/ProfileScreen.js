import React from 'react';
import {ActivityIndicator, Image, Text, View, FlatList} from 'react-native';
import styles from '../../assets/scripts/styles';

import ProfileCtrl from '../../controllers/profile/ProfileCtrl';
import ReviewItem from '../../components/reviews/ReviewItem';

export class ProfileScreen extends React.Component {
  async componentDidMount() {
    const initialIdUser = this.props.route.params.sessionId;
    this.setState({ id_user: initialIdUser }, () => {
      this.loadProfileData(initialIdUser);
    });
    this.focusListener = this.props.navigation.addListener('focus', () => {
      const idUser = this.props.route.params.sessionId;
      this.setState({ id_user: idUser, loading: true }, () => {
        this.loadProfileData(idUser);
      });
    });
  }

  componentWillUnmount() {
    if (this.focusListener && typeof this.focusListener === 'function') {
      this.focusListener();
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      rewards: [],
      loading: true,
      page: 1,
      id_profile: this.props.route.params.sessionId,
      isCurrentUser: this.props.route.params.isCurrentUser,
      profile: null,
      aiReview: null,
      visibleReviews: [],
      hasMoreItems: true,
      isLoadingMore: false,
    };
    this.controller = new ProfileCtrl();
  }


  handleUserNamePress = (id_user) => {
    this.props.navigation.navigate("Perfil", {
      sessionId: id_user,
      isCurrentUser: false
    });
  };

  // Eliminado: componentDidMount duplicado

  componentDidUpdate(prevProps) {
    // Check if route params have changed
    if (prevProps.route.params.sessionId !== this.props.route.params.sessionId) {
      const newIdUser = this.props.route.params.sessionId;
      this.setState(
        {
          id_user: newIdUser,
          loading: true, // Set loading to true when switching to new user profile
        },
        () => {
          this.loadProfileData(newIdUser);
        }
      );
    }
  }

  loadProfileData = async (id_user) => {
    const profileData = await this.controller.getProfile(id_user);

    this.setState({ profile: profileData });

    const reviewsData = await this.controller.getReviews(id_user);
    const aiReviewData = await this.controller.getAIReview(id_user);

    const itemsPerPage = 5;
    const visibleReviews = reviewsData.reviews.slice(0, itemsPerPage);

    this.setState({ 
      rewards: reviewsData.rewards, 
      reviews: reviewsData.reviews, 
      aiReview: aiReviewData,
      visibleReviews: visibleReviews,
      page: 1,
      hasMoreItems: reviewsData.reviews.length > itemsPerPage,
      loading: false 
    });
  };

  handleLoadMore = () => {
    const { visibleReviews, reviews, hasMoreItems, isLoadingMore } = this.state;
    
    if (!isLoadingMore && hasMoreItems) {
      this.setState({ isLoadingMore: true });
      
      const itemsPerPage = 5;
      const currentCount = visibleReviews.length;
      const nextItems = reviews.slice(currentCount, currentCount + itemsPerPage);
      
      if (nextItems.length > 0) {
        this.setState({
          visibleReviews: [...visibleReviews, ...nextItems],
          hasMoreItems: visibleReviews.length + nextItems.length < reviews.length,
          isLoadingMore: false,
        });
      } else {
        this.setState({ hasMoreItems: false, isLoadingMore: false });
      }
    }
  };

  renderReviewItem = ({ item }) => {
    return <ReviewItem item={item} handleUserNamePress={this.handleUserNamePress} />;
  };

  renderHeader = () => {
    const { aiReview } = this.state;
    
    if (!aiReview) {
      return null;
    }

    return (
      <View style={styles.aiReviewContainer}>
        <Text style={styles.aiReviewTitle}>🤖 Reseña generada por IA</Text>
        <View style={styles.line}></View>
        <Text style={styles.aiReviewText}>{aiReview}</Text>
      </View>
    );
  };

  renderEmptyList = () => {
    return (
      <View>
        {this.renderHeader()}
        <Text style={styles.noItems}>No se encontraron resultados</Text>
      </View>
    );
  };

  render() {
    const { loading, profile, isCurrentUser, visibleReviews, rewards, aiReview } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#28a745" />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: `${profile.img}` }} style={styles.userImage} />
          <View style={styles.profileHeaderData}>
            <Text style={[styles.text, styles.nameText, styles.boldText]}>{profile.name}</Text>
            <Text style={styles.text}>
              Habilidad: {profile.ability} <View style={styles.dot}></View> karma: {profile.karma}
            </Text>
            <Text style={styles.text}>{profile.description}</Text>
          </View>
          <View style={styles.rewardContainer}>
            {rewards.map((reward, index) => (
              <View key={index} style={styles.rewardItem}>
                <Image source={{ uri: `https://sidekick-server-nine.vercel.app/api/images/${reward.img}` }} style={styles.rewardImageProfile} />
                <Text style={styles.rewardAmount}>{reward.amount}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.line}></View>
        
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={visibleReviews}
          renderItem={this.renderReviewItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={this.renderHeader}
          ListEmptyComponent={this.renderEmptyList}
          style={styles.FlatList}
        />
      </View>
    );
  }
}