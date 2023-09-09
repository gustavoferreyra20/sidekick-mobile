import axios from 'axios';
import { SIDEKICK_API } from "@env";

class RewardService {
    static async getAll(args = null) {
        return new Promise((resolve, reject) => {
            var url = `${SIDEKICK_API}rewards`;

            axios.get(url)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    static async use(id_user, id_reward) {
        return new Promise((resolve, reject) => {
            const url = `${SIDEKICK_API}rewards/join?id_reward=${id_reward}&id_user=${id_user}`;

            axios.delete(url)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    static async getByUser(id_user) {
        return new Promise((resolve, reject) => {
            const url = `${SIDEKICK_API}rewards/join?id_user=${id_user}`;

            axios.get(url)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
}

export default RewardService;