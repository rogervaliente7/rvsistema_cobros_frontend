import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ScriptLoaderService } from '../services/script-loader.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  loadingResources = true;
  stylesLoaded = false;
  scriptsLoaded = false;
  loading = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loginMessage: string = '';
  isLoading: boolean = false;

  constructor(
    public scriptLoader: ScriptLoaderService,
    @Inject(PLATFORM_ID) public platformId: Object,
    private cd: ChangeDetectorRef,
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // 🔧 Cargar estilos INMEDIATAMENTE para evitar FOUC
      this.loadStylesEarly();
    } else {
      // En SSR, marcar como cargado inmediatamente
      this.loadingResources = false;
    }
  }

  private loadStylesEarly(): void {
    const styles = [
      '/assets/plantilla-bootstrap/css/styles.min.css',
    ];
  
    this.scriptLoader.loadStyles(styles)
      .then(() => {
        console.log('✅ Estilos cargados');
        this.stylesLoaded = true;
        document.body.classList.add('styles-loaded'); // <- Muestra la app
        this.checkIfResourcesReady();
      })
      .catch(err => {
        //console.error('Error cargando estilos:', err);
        this.stylesLoaded = true;
        document.body.classList.add('styles-loaded'); // <- Muestra igual aunque haya error
        this.checkIfResourcesReady();
      });
  }

  private checkIfResourcesReady(): void {
    if (this.stylesLoaded && this.scriptsLoaded) {
      // 🔧 Pequeño delay adicional para asegurar que todo esté renderizado
      setTimeout(() => {
        this.loadingResources = false;
        this.cd.detectChanges();
        console.log('✅ Todos los recursos cargados');
      }, 200);
    }
  }

  ngAfterViewInit(): void {}
}
