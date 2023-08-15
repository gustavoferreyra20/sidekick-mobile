import { Component } from 'react';
import { Linking } from 'react-native';
import axios from 'axios';
import RewardService from '../reward/rewardService';

export default class StoreController extends Component {

    handleGetRewards = () => {
        return new Promise((resolve, reject) => {
            RewardService.getAll().then((data) => {
                resolve(data)
            });
        });

    }

    btnBuy = async (reward) => {
        const { ACCESS_TOKEN } = process.env;
        const url = 'https://api.mercadopago.com/checkout/preferences';

        const body = {
            items: [
                {
                    title: reward.name,
                    description: reward.description,
                    picture_url: 'http://www.myapp.com/myimage.jpg',
                    category_id: 'reward',
                    quantity: 1,
                    unit_price: reward.price,
                },
            ],
        };

        try {
            const res = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
            });
            this.openExternalLink(res.data.init_point);
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