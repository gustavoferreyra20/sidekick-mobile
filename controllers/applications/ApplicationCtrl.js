import PostService from "../../services/PostService";
import UserService from "../../services/UserService";

export default class ApplicationCtrl {
    constructor() {
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
        this.contactInf = [];
    }

    getApplications = (id_profile, type) => {
        return UserService.getApplications(id_profile, type)
            .then(applications => {
                return applications;
            })
            .catch(error => {
                console.log(error);
                return null;
            });
    };

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

    changeStatus = async (id_user, id_post, status, afterUpdateCallback) => {
        return new Promise((resolve, reject) => {
            try {
                PostService.updateApplication(id_user, id_post, status).then(() => {
                    afterUpdateCallback();
                }).then(() => {
                    resolve();
                })
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }

    contact = async (id_user) => {
        return new Promise(async (resolve, reject) => {
            try {
                this.contactInf = await UserService.getContactInf(id_user);
                this.modalType = "contactInf";
                this.msg = id_user
                this.modalVisible = true;
                resolve();
            } catch (error) {
                console.log(error);
                resolve(null);
            }
        });
    }
}