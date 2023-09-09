import { Component } from 'react';
import { Linking } from 'react-native';
import axios from 'axios';
import RewardService from '../reward/rewardService';
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
    newReview = async (review, callback, updateReview) => {

        try {
            console.log(review.reward)
            if (review.reward !== null) {
                review.reward = review.reward.id_reward;

                await ReviewService.save(review);
                await RewardService.use(review.id_writerUser, review.reward)
            } else {
                await ReviewService.save(review);
            }


            PostService.addApplication({ id_user: review.id_user, id_post: review.id_post, status: 'reviewed' }).then(() => {
                this.modalType = "action";
                this.msg = "Calificacion enviada";
                this.modalVisible = true;
                this.modalFunction = () => {
                    updateReview();
                };


                if (typeof callback === 'function') {
                    callback();
                }
            });

        } catch (error) {
            console.log(error);
        }
    };

    showRewards = async (id_user) => {
        const response = await RewardService.getByUser(id_user);
        return response;
    };
}