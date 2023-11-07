import UserService from '../users/userService';

class ProfileController {
    getProfile = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserService.get(id_profile);
                const response = await UserService.getStats(id_profile);

                const profile = {
                    name: user.name,
                    description: user.description,
                    ability: (response[0].abilityScore === undefined) ? 0 : Math.round(response[0].abilityScore),
                    karma: (response[0].karmaScore === undefined) ? 0 : Math.round(response[0].karmaScore),
                    img: user.img
                };
                resolve(profile);
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    getReviews = (id_user) => {
        return new Promise(async (resolve, reject) => {
            try {
                const reviews = await UserService.getReviews(id_user);
                resolve(reviews);
            } catch (error) {
                console.log(error);
                resolve(null);
            }

        });
    }
}

export default ProfileController;