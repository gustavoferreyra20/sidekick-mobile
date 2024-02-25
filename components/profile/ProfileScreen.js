import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import styles from '../../assets/scripts/styles';
import { SIDEKICK_API } from "@env"
import ProfileCtrl from './ProfileCtrl';
import ReviewScreen from '../reviews/ReviewScreen'
import Loader from '../../assets/scripts/loader';

export class ProfileScreen extends React.Component {
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
    };
    this.controller = new ProfileCtrl();
  }


  handleUserNamePress = (id_user) => {
    this.props.navigation.navigate("Perfil", {
      sessionId: id_user,
      isCurrentUser: false
    });
  };

  componentDidMount() {
    const initialIdUser = this.props.route.params.sessionId;
    this.setState({ id_user: initialIdUser }, () => {
      this.loadProfileData(initialIdUser);
    });
  }

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

    this.setState({ rewards: reviewsData.rewards, reviews: reviewsData.reviews, loading: false });
  };

  render() {
    const { loading, profile, isCurrentUser, reviews, rewards } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: `${SIDEKICK_API}images/${profile.img}` }} style={styles.userImage} />
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
                <Image source={{ uri: `${SIDEKICK_API}images/${reward.img}` }} style={styles.rewardImageProfile} />
                <Text style={styles.rewardAmount}>{reward.amount}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.line}></View>
        <Loader
          data={reviews}
          renderItem={({ item }) => <ReviewScreen item={item} handleUserNamePress={this.handleUserNamePress} />}
          style={styles.FlatList}
        />
      </View>
    );
  }
}