import AxiosInstance from '../middleware/AxiosInstance';

class PaymentService {

    static async newPayment(reward) {
        return new Promise((resolve, reject) => {
            const paymentData = {
                id_reward: reward.id_reward
            };
            
            AxiosInstance.post(`payments/mp`, paymentData)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }
}

export default PaymentService;
