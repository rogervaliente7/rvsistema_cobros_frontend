// import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root'
// })
// export class ScriptLoaderService {
//   private loadedScripts: Set<string> = new Set();

//   constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

//   // loadScripts(scripts: string[]): Promise<void> {
//   //   if (!isPlatformBrowser(this.platformId)) {
//   //     return Promise.resolve(); // No hacer nada en SSR
//   //   }

//   //   const promises = scripts.map(src => this.loadScript(src));
//   //   return Promise.all(promises).then(() => {});
//   // }

//   loadScripts(scripts: string[]): Promise<void> {
//     if (!isPlatformBrowser(this.platformId)) {
//       return Promise.resolve(); // No hacer nada en SSR
//     }
  
//     // Carga secuencial con reduce
//     return scripts.reduce(
//       (promiseChain, src) => promiseChain.then(() => this.loadScript(src)),
//       Promise.resolve()
//     );
//   }

//   private loadScript(src: string): Promise<void> {
//     return new Promise<void>((resolve, reject) => {
//       if (!isPlatformBrowser(this.platformId)) {
//         resolve();
//         return;
//       }

//       if (this.loadedScripts.has(src)) {
//         resolve(); // Ya cargado
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = src;
//       script.defer = true;
//       script.onload = () => {
//         this.loadedScripts.add(src);
//         resolve();
//       };
//       script.onerror = () => reject(new Error(`Error cargando el script ${src}`));
//       document.body.appendChild(script);
//     });
//   }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  private loadedScripts: Set<string> = new Set();
  private loadedStyles: Set<string> = new Set();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loadScripts(scripts: string[]): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(); // No hacer nada en SSR
    }

    // Carga secuencial
    return scripts.reduce(
      (promiseChain, src) => promiseChain.then(() => this.loadScript(src)),
      Promise.resolve()
    );
  }

  private loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      if (this.loadedScripts.has(src)) {
        resolve(); // Ya cargado
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = () => {
        this.loadedScripts.add(src);
        resolve();
      };
      script.onerror = () => reject(new Error(`Error cargando el script ${src}`));
      document.body.appendChild(script);
    });
  }

  loadChatbot(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Configuración global del ChatBot
    (window as any)._ow = (window as any)._ow || {};
    (window as any).__ow = {
      organizationId: 'ad14c8fa-e9a6-459a-b64c-9f1e0f8f3ad7',
      template_id: '676abead-1777-42cf-b94b-327c7181c4b0',
      integration_name: 'manual_settings',
      product_name: 'chatbot'
    };

    // Cargar el script principal del widget
    this.loadScript('https://cdn.openwidget.com/openwidget.js')
      .then(() => console.log('✅ ChatBot cargado correctamente'))
      .catch(err => console.error('❌ Error cargando ChatBot:', err));
  }

  loadStyles(styles: string[]): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(); // No hacer nada en SSR
    }
  
    return styles.reduce(
      (promiseChain, href) => promiseChain.then(() => this.loadStyle(href)),
      Promise.resolve()
    );
  }
  
  private loadStyle(href: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.loadedScripts.has(href)) {
        resolve();
        return;
      }
  
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => {
        this.loadedScripts.add(href);
        resolve();
      };
      link.onerror = () => reject(new Error(`Error cargando el estilo ${href}`));
      document.head.appendChild(link);
    });
  }
  
}

