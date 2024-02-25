import AxiosInstance from '../../middleware/AxiosInstance';

class PaymentService {

    static async newPayment(reward) {
        return new Promise((resolve, reject) => {
            AxiosInstance.post(`payments/mp`, reward)
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
