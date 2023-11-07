import { Component } from 'react';
import { Linking } from 'react-native';

import RewardService from '../reward/rewardService';
import PaymentService from '../payments/paymentService';

export default class StoreController extends Component {

    handleGetRewards = () => {
        return new Promise((resolve, reject) => {
            RewardService.getAll().then((data) => {
                resolve(data)
            });
        });

    }

    btnBuy = async (reward) => {
        try {
            const res = await PaymentService.newPayment(reward);

            this.openExternalLink(res.init_point);
        } catch (error) {
            console.log(error);
        }
    };

    openExternalLink = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    console.log("Don't know how to open URI: " + url);
                }
            })
            .catch((error) => console.error('An error occurred', error));
    };

}