import axiosInstance from '../../middleware/axiosInstance ';

class RewardService {
    static async getAll(args = null) {
        return new Promise((resolve, reject) => {
            var url = `rewards`;

            axiosInstance.get(url)
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