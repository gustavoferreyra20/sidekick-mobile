import { Component } from 'react';
import { Linking } from 'react-native';
import axios from 'axios';
import RewardService from '../reward/rewardService'; // Make sure to import the appropriate reward service

export default class RateController extends Component {

    constructor(props) {
        super(props);
    }
    newReview = async (review) => {
        const { id_user, id_post } = this.props.route.params; // Assuming you're using React Navigation for navigation
        review.id_user = id_user;
        review.id_post = id_post;
        review.id_writerUser = userSession.id_user;
        if (review.reward !== undefined) review.reward = review.reward.id_reward;

        try {
            await reviews.save(review);
            await posts.addApplication({ id_user: review.id_user, id_post: review.id_post, status: 'reviewed' });
            if (review.reward !== undefined) await rewards.use(review.reward);
            popups.alert("Calificacion enviada");
            // Add navigation logic here to go back to the desired screen
        } catch (error) {
            console.log(error);
        }
    };

    btnSelectReward = (form, reward) => {
        form.reward = reward;
        this.setState({ rewards: [] });
        return form;
    };

    btnDeleteReward = (form) => {
        form.reward = '';
        this.showRewards();
        return form;
    };

    btnGoToStore = () => {
        // Add navigation logic here to navigate to the Store screen
    };

    showRewards = async (id_user) => {
        const response = await RewardService.getByUser(id_user);
        return response;
    };
}