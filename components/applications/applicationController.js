import PostService from "../posts/postService";
import UserService from "../users/userService";

export default class ApplicationController {
    constructor() {
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }

    getApplications = (id_profile, type) => {
        return new Promise(async (resolve, reject) => {
            try {
                const applications = await UserService.getApplications(id_profile, type)
                resolve(applications)
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    cancelApplication = (id_post, id_application, afterCancelCallback) => {
        return new Promise((resolve, reject) => {
            try {
                this.modalType = "confirm";
                this.msg = "Seguro desea eliminar la solicitud?"
                this.modalVisible = true;
                this.modalFunction = async () => {
                    await PostService.removeApplication(id_post, id_application);
                    afterCancelCallback();
                };
                resolve();
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    remove = (id_post, afterCancelCallback) => {
        return new Promise((resolve, reject) => {
            try {
                this.modalType = "confirm";
                this.msg = "Seguro desea eliminar el post?"
                this.modalVisible = true;
                this.modalFunction = async () => {
                    await PostService.remove(id_post);
                    afterCancelCallback();
                };
                resolve();
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    changeStatus = async (id_user, id_post, status) => {
        return new Promise((resolve, reject) => {
            try {
                PostService.updateApplication(id_user, id_post, status)
                resolve();
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }
}