import PostService from "../posts/postService";

class ApplicationController {
    showSendedApps = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            const applications = await PostService.getApplications({ id_user: id_profile, type: 'sended' })
            resolve(applications)
        });
    }

    showReceivedApp = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            const applications = await PostService.getApplications({ id_user: id_profile, type: 'received' })
            resolve(applications)
        });
    }
}

export default ApplicationController;