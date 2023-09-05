import { Component } from 'react';
import { Linking } from 'react-native';
import axios from 'axios';
import RewardService from '../reward/rewardService'; // Make sure to import the appropriate reward service
import ReviewService from '../reviews/reviewService';
import PostService from '../posts/postService';

export default class RateController extends Component {

    constructor(props) {
        super(props);
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }
    newReview = async (review, callback, changeRate) => {
        if (review.reward !== undefined) {
            review.reward = review.reward.id_reward;
        }

        try {

            await ReviewService.save(review);
            await PostService.addApplication({ id_user: review.id_user, id_post: review.id_post, status: 'reviewed' });
            if (review.reward !== undefined) await RewardService.use(review.reward);

            popups.alert("Calificacion enviada");

            this.modalType = "action";
            this.msg = "Calificacion enviada";
            this.modalVisible = true;
            this.modalFunction = () => {
                changeRate();
            };


            if (typeof callback === 'function') {
                callback();
            }
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