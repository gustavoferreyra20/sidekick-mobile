import PostService from "../posts/postService";

export default class ApplicationController {
    constructor() {
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }

    getSendedApps = (id_profile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const applications = await PostService.getApplications({ id_user: id_profile, type: 'sended' })
                resolve(applications)
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    getReceivedApp = async (id_profile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const applications = await PostService.getApplications({ id_user: id_profile, type: 'received' })
                resolve(applications)
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    cancelApplication = (id_post, id_profile, afterCancelCallback) => {
        return new Promise((resolve, reject) => {
            try {
                this.modalType = "confirm";
                this.msg = "Seguro desea eliminar la solicitud?"
                this.modalVisible = true;
                this.modalFunction = async () => {
                    await PostService.removeApplication(id_post, id_profile);
                    afterCancelCallback();
                };
                resolve();
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }
}