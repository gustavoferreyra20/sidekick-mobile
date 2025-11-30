import AxiosInstance from '../middleware/AxiosInstance';

class RewardService {
    static async getAll(args = null) {
        return new Promise((resolve, reject) => {
            var url = `rewards`;

            AxiosInstance.get(url)
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