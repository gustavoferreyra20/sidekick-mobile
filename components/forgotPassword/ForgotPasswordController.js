import { Component } from 'react';
import AuthService from '../auth/AuthService';

export default class ForgotPasswordController extends Component {
    constructor(props) {
        super(props);
        this.email = '';
        this.msg = "";
        this.modalType = "alert";
        this.modalFunction = () => { };
        this.modalVisible = false;
    }

    resetPassword = (handleLoginPress) => {
        return new Promise((resolve, reject) => {
            if (!this.email.length) {
                this.msg = "Por favor complete todos los campos requeridos"
                this.modalVisible = true
                resolve();
                return;
            }

            AuthService.resetPassword({ email: this.email })
                .then((res) => {
                    this.modalType = "action";
                    this.msg = "Revisa tu casilla de correo"
                    this.modalVisible = true
                    this.modalFunction = () => {
                        handleLoginPress();
                    }
                    resolve();
                    return;
                })
                .catch(() => {
                    this.msg = "Usuario y/o contraseña incorrectas"
                    this.modalVisible = true
                    resolve();
                });
        });
    };
}