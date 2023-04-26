import axios from 'axios';
import { SIDEKICK_API } from "@env"

class UserService {

    static async get(condition) {
        return new Promise((resolve, reject) => {
          const url = `${SIDEKICK_API}users/bo?`;
          const params = new URLSearchParams(condition);
      
          axios.get(url + params)
            .then((res) => {
              resolve(res.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }

}

export default UserService;
