import React, { Component } from 'react';
import UserService from "../../services/UserService";

export default class ConfigCtrl extends Component {
    constructor(props) {
        super(props);
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }

    updatePAssword = (id_user, password, newPassword, onLogout) => {
        return new Promise((resolve, reject) => {
            if (password.length < 8 || newPassword.length < 8) {
                this.msg = "Contraseñas demasiado cortas"
                this.modalVisible = true
                resolve();
                return;
            }

            UserService.checkPassword(id_user, { password: password })
                .then((match) => {
                    if (match) {
                        UserService.update(id_user, { password: newPassword })
                            .then(() => {
                                this.modalType = "action";
                                this.msg = "Contraseña actualizada con exito, cerrando sesión"
                                this.modalVisible = true
                                this.modalFunction = () => {
                                    onLogout();
                                }
                                resolve();
                                return;
                            })
                            .catch((error) => {
                                console.error("Error updating password: ", error);
                            });
                    } else {
                        this.msg = "Contraseña incorrecta"
                        this.modalVisible = true
                        resolve();
                        return;
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}