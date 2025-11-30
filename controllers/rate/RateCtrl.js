import { Component } from 'react';
import ReviewService from '../../services/ReviewService';
import PostService from '../../services/PostService';
import UserService from '../../services/UserService';

export default class RateCtrl extends Component {

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
                return PostService.updateApplication(review.id_post, id_application, 'complete');
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