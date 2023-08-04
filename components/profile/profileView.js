import React, { Component } from 'react';
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
    };
    this.controller = new ProfileController();
    this.id_profile = this.props.route.params.id_user;
    this.isCurrentUser = this.props.route.params.isCurrentUser;
    this.profile = null;
  }

  componentDidMount() {
    this.loadProfileData();
  }

  loadProfileData = () => {
    this.controller.getProfile(this.id_profile).then((data) => {
      this.profile = data;
      this.controller.getReviews(this.id_profile).then((data) => {
        if (data.length > 0) {
          this.setState({
            reviews: data,
            loading: false,
            visibleReviews: data.slice(0, 5),
          });
        } else {
          this.setState({
            loading: false,
          });
        }
      });
    });
  };

  render() {
    const { loading, visibleReviews } = this.state;

    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: `${SIDEKICK_API}images/${this.profile.img}` }} style={styles.userImage} />
          <View style={styles.profileHeaderData}>
            <Text style={[styles.text, styles.nameText, styles.boldText]}>{this.profile.name}</Text>
            <Text style={styles.text}>
              Habilidad: {this.profile.ability} <View style={styles.dot}></View> karma: {this.profile.karma}
            </Text>
            <Text style={styles.text}>{this.profile.description}</Text>
          </View>
          {this.isCurrentUser ? (
            <Button style={styles.profileEdit} title="Editar" color="#0eaa61" />
          ) : null}
        </View>
        <View style={styles.line}></View>
        <Loader
          data={this.state.reviews}
          renderItem={({ item }) => <Review item={item} />}
          style={styles.FlatList}
        />
      </View>
    );
  }
}