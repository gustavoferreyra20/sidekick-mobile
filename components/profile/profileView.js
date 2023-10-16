import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import styles from '../../assets/styles';
import { SIDEKICK_API } from "@env"
import ProfileController from './profileController';
import Review from '../reviews/reviewView'
import Loader from '../../assets/loader';

export class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      visibleReviews: [],
      loading: true,
      page: 1,
      id_profile: this.props.route.params.id_user,
      isCurrentUser: this.props.route.params.isCurrentUser,
      profile: null,
    };
    this.controller = new ProfileController();
  }


  handleUserNamePress = (id_user) => {

    if (this.state.id_user !== id_user) {
      this.setState(
        {
          id_user: id_user,
          isCurrentUser: id_user == this.props.route.params.id_user,
          loading: true,
        },
        () => {
          this.loadProfileData(id_user); // Pass id_user as an argument
        }
      );
    }
  };

  componentDidMount() {
    const initialIdUser = this.props.route.params.id_user; // Use the initial id_user from props
    this.setState({ id_user: initialIdUser }, () => {
      this.loadProfileData(initialIdUser); // Pass initialIdUser as an argument
    });
  }

  loadProfileData = async (id_user) => { // Accept id_user as an argument
    this.controller.getProfile(id_user).then((data) => { // Use id_user here
      this.setState({ profile: data });
      this.controller.getReviews(id_user).then((data) => { // Use id_user here
        if (data.length > 0) {
          this.setState({ reviews: data, visibleReviews: data.slice(0, 5), loading: false });
        } else {
          this.setState({ loading: false });
        }
      });
    });
  };

  render() {
    const { loading, profile, isCurrentUser, reviews, visibleReviews } = this.state;

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
          {isCurrentUser ? (
            <Button style={styles.profileEdit} title="Editar" color="#0eaa61" />
          ) : null}
        </View>
        <View style={styles.line}></View>
        <Loader
          data={reviews}
          renderItem={({ item }) => <Review item={item} handleUserNamePress={this.handleUserNamePress} />}
          style={styles.FlatList}
        />
      </View>
    );
  }
}