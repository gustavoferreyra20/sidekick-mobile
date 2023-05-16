import axios from 'axios';
import CryptoJS from 'react-native-crypto-js';
import { SIDEKICK_API, JWT_SECRET, JWT_COOKIE_EXPIRES } from "@env"

class TokenService {

    static async create(id) {
        return new Promise((resolve, reject) => {
            const randomBytes = CryptoJS.lib.WordArray.random(20);
            const token = CryptoJS.enc.Hex.stringify(randomBytes)
            const expire = new Date(Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000);
            const url = SIDEKICK_API + 'tokens';

            let data = {
                id_user: id,
                token: token,
                expiration_date: expire.toISOString().slice(0, 10),
                platform: "mobile"
            }

            axios.post(url, data)
                .then(() => {
                    resolve(token)
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
    }

    static async delete(id_user, token) {
        const url = SIDEKICK_API + 'tokens/bo?id_user=' + id_user + '&token='+ token;
        await axios.delete(url)
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default TokenService;