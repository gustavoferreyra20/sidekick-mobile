import axios from 'axios';
import { SIDEKICK_API } from "@env";

class ModeService {
    static async getAll(args = null) {
        return new Promise((resolve, reject) => {
            var url = `${SIDEKICK_API}modes`;

            if (args !== null) {
                url = `${url}/bo?${params}`;
                const params = new URLSearchParams(args);
            }

            axios.get(url)
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