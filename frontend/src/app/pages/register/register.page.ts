import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class RegisterPage {
  user = { username: '', email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: async (res) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Usuario registrado correctamente.',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl('/login');
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: err.error?.message || 'No se pudo completar el registro.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}