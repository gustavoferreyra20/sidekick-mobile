import UserService from '../users/userService';
import ReviewService from '../reviews/reviewService';

class ProfileController {
    getProfile = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserService.get({ id_user: id_profile });
                const response = await ReviewService.getAvg({ id_user: user[0].id_user });

                const profile = {
                    name: user[0].name,
                    description: user[0].description,
                    ability: response[0]?.abilityScore ? Math.round(response[0].abilityScore) : 0,
                    karma: response[0]?.karmaScore ? Math.round(response[0].karmaScore) : 0,
                    img: user[0].img
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
                const reviews = await ReviewService.getAll({ id_user: id_user });
                resolve(reviews);
            } catch (error) {
                console.log(error);
                resolve(null);
            }

        });
    }
}

export default ProfileController;