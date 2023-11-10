import { Component } from 'react';
import RewardService from '../reward/rewardService';
import ReviewService from '../reviews/reviewService';
import PostService from '../posts/postService';
import UserService from '../users/userService';
//import UserService from '../users/userService';

export default class RateController extends Component {

    constructor(props) {
        super(props);
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    };

    newReview = async (review, callback, updateReview, id_application) => {
        if (review.reward != null) review.reward = review.reward.id_reward;

        UserService.addReview(review)
            .then((res) => {
 
                if (review.reward !== null) {
                    return ReviewService.addReward(res.reviewId, review.reward);
                }
            })
            .then(() => {
                return PostService.updateApplication(review.id_post, id_application, 'pending');
            })
            .then(() => {
                this.modalType = "action";
                this.msg = "Calificacion enviada";
                this.modalVisible = true;
                this.modalFunction = () => {
                    updateReview();
                };

                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    showRewards = async (id_user) => {
        const response = await UserService.getRewards(id_user);
        return response;
    };
}