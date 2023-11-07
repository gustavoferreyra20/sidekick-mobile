import axiosInstance from '../../middleware/axiosInstance ';

class PaymentService {

    static async newPayment(reward) {
        return new Promise((resolve, reject) => {
            axiosInstance.post(`payment`, reward)
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
