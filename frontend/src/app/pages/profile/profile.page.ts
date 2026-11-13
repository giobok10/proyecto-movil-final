import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonAvatar, IonButton, IonIcon } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline, logOutOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAvatar,
    IonButton,
    IonIcon
  ]
})
export class ProfilePage {
  userProfile = {
    username: localStorage.getItem('username') || 'Usuario',
    email: localStorage.getItem('email') || 'correo@domain.com'
  };

  // Si no hay foto, guardamos null para mostrar el ícono por defecto
  profileImage: SafeResourceUrl | string | null = null;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ cameraOutline, logOutOutline, personCircleOutline });
  }

  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });

      if (image && image.dataUrl) {
        this.profileImage = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error al capturar la imagen o acción cancelada', error);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}