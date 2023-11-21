import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

export const urlBase: string = 'http://localhost:3333';
export const urlFront: string = 'http://localhost:8888';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(public toastController: ToastController, public alertController: AlertController) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async presentToastError(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3500,
      cssClass: "bold-toast",
      color: "danger",
      icon: 'close-circle'
    });
    toast.present();
  }

  async presentToastWarning(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3500,
      cssClass: "bold-toast",
      color: "warning",
      icon: 'alert-circle',
      position: 'top'
    });
    toast.present();
  }

  async presentToastSuccess(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3500,
      cssClass: "bold-toast",
      color: "success",
      icon: 'checkmark-circle',
      position: 'top'
    });
    toast.present();
  }

  async presentAlertConfirm(header: string, message: string, cssclass: string = "") {
    const alert = await this.alertController.create({
      cssClass: cssclass,
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel',
          handler: () => {
            alert.dismiss(false, 'cancel');
            return true;
          }
        }, {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'alert-button-confirm',
          handler: () => {
            alert.dismiss(true, 'confirm');
            return true;
          }
        }
      ]
    });
    alert.present()
    var confirm = await alert.onDidDismiss();
    return confirm.role == 'confirm';
  }

  async presentAlertInform(header: string, message: string, cssclass: string = "") {
    const alert = await this.alertController.create({
      cssClass: cssclass,
      header: header,
      message: message,
      buttons: [{
        text: 'Ok',
        role: 'confirm',
        handler: () => {
          alert.dismiss(true, 'confirm');
          return true;
        }
      }
      ]
    });
    alert.present()
    var confirm = await alert.onDidDismiss();
    return confirm.data;
  }
}
