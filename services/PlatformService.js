
import AxiosInstance from '../middleware/AxiosInstance';

class PlatformService {
    static async getAll(args = null) {
        return new Promise((resolve, reject) => {

            var url = `platforms`;

            if (args !== null) {
                const params = new URLSearchParams(args);
                url = `${url}/bo?${params}`;
            }

            AxiosInstance.get(url)
                .then((res) => {
                    resolve(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }

    static async getOptions(game = null, any = false) {

        const options = [];
        const platforms = (game !== null) ? await this.getByGame(game) : await this.getAll();

        if (any) {
            options.push({ value: "any", name: "Cualquier plataforma" });
        }

        for (let i = 0, n = platforms.length; i < n; i++) {
            if (platforms[i]) {
                options.push({ value: platforms[i].id_platform, name: platforms[i].name });
            }
        }

        return options;
    }

}

export default PlatformService;