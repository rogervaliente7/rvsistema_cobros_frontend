import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, RouterOutlet } from '@angular/router';
import { ScriptLoaderService } from '../services/script-loader.service';
//import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { BodyHeaderComponent } from './body-header/body-header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    CommonModule,
    MainHeaderComponent,
    SidebarComponent,
    FooterComponent,
    BodyHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
    //private http: HttpClient
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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Solo cargar scripts después de que los estilos estén listos
      this.loadScriptsAfterStyles();
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

  private loadScriptsAfterStyles(): void {
    // 🔧 Esperar un poco más para asegurar que los estilos estén aplicados
    const delay = this.stylesLoaded ? 100 : 500;
    
    setTimeout(() => {
      const scripts = [
        'https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js',
        '/assets/plantilla-bootstrap/libs/jquery/dist/jquery.min.js',
        '/assets/plantilla-bootstrap/libs/bootstrap/dist/js/bootstrap.bundle.min.js',
        '/assets/plantilla-bootstrap/js/sidebarmenu.js',
        '/assets/plantilla-bootstrap/js/app.min.js',
        '/assets/plantilla-bootstrap/libs/apexcharts/dist/apexcharts.min.js',
        '/assets/plantilla-bootstrap/libs/simplebar/dist/simplebar.js',
        '/assets/plantilla-bootstrap/js/dashboard.js',
        //'/assets/plantilla-welcome/js/main.js'
      ];

      this.scriptLoader.loadScripts(scripts)
        .then(() => {
          console.log('✅ Scripts cargados');
          this.scriptsLoaded = true;
          this.checkIfResourcesReady();
          
          // 🔧 Inicializar carrusel específicamente
          //this.initializeCarousel();
        })
        .catch(err => {
          //console.error('Error cargando scripts:', err);
          this.scriptsLoaded = true;
          this.checkIfResourcesReady();
        });
    }, delay);

  }
}
