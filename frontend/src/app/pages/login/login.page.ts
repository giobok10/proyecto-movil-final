import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {
  credentials = { email: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        localStorage.setItem('username', res.username);
        localStorage.setItem('email', res.email);
        this.router.navigateByUrl('/profile');
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Acceso Denegado',
          message: err.error?.message || 'Credenciales incorrectas.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}