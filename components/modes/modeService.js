import AxiosInstance from '../../middleware/AxiosInstance';

class ModeService {
    static async getAll() {
        return new Promise((resolve, reject) => {
            AxiosInstance.get(`modes`)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    static async getOptions(any = false) {
        const options = [];
        const modes = await this.getAll();

        if (any) {
            options.push({ value: "any", name: "Cualquier mode" });
        }

        for (let i = 0, n = modes.length; i < n; i++) {
            if (modes[i]) {
                options.push({ value: modes[i].id_mode, name: modes[i].name });
            }
        }

        return options;
    }

}

export default ModeService;