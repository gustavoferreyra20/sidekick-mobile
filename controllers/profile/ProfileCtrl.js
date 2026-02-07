import UserService from '../../services/UserService';

class ProfileCtrl {
    getProfile = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserService.get(id_profile);
                const response = await UserService.getStats(id_profile);

                const profile = {
                    name: user.name,
                    description: user.description,
                    ability: (response[0].abilityscore === undefined) ? 0 : Math.round(response[0].abilityscore),
                    karma: (response[0].karmascore === undefined) ? 0 : Math.round(response[0].karmascore),
                    img: user.img
                };
                resolve(profile);
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    getReviews = async (id_user) => {
        try {
          // Fetch reviews data
          const reviews = await UserService.getReviews(id_user);
          
          // Initialize an object to store the rewards count
          let rewardsCount = {};
      
          // Iterate through the reviews array
          reviews.forEach(review => {
            // Iterate through the rewards of each review
            review.rewards.forEach(reward => {
              // Check if the reward's img exists in rewardsCount
              if (rewardsCount.hasOwnProperty(reward.img)) {
                // Increment the count if the reward already exists
                rewardsCount[reward.img]++;
              } else {
                // Initialize the count to 1 if the reward is encountered for the first time
                rewardsCount[reward.img] = 1;
              }
            });
          });
      
          // Initialize an array to store the result
          let totalRewards = [];
      
          // Iterate through the rewardsCount object and push each reward and its count to totalRewards
          for (let reward in rewardsCount) {
            totalRewards.push({ img: reward, amount: rewardsCount[reward] });
          }
      
          // Return an object containing reviews and rewards count
          return { reviews: reviews, rewards: totalRewards };
        } catch (error) {
          console.log(error);
          return { reviews: null, rewards: null }; // Return null if an error occurs
        }
      };

    getAIReview = async (id_user) => {
        try {
            const aiReviewData = await UserService.getAIReview(id_user);
            // Check if AI review exists and should be shown
            if (aiReviewData && aiReviewData.show) {
                return aiReviewData.ai_review;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
}

export default ProfileCtrl;