import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cobros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.css']
})
export class CobrosComponent {

  data = {
    banco: 'Banco Agrícola',
    cartera: 'Consumo 2024',
    cuenta: '00124578963',
    producto: 'Préstamo Personal',
    niu: 'NIU-45879',
    nombre: 'Juan Pérez López',
    telefono: '7012-3456',
    direccion: 'San Salvador, Col. Escalón',
    referencia: 'Casa color verde, portón negro',
    saldo: 5000,
    capital: 3200,
    intereses: 800,
    mora: 300,
    total: 4300,
    ultimoPago: '2025-01-10'
  };

  gestiones = [
    {
      usuario: 'Marvin Rodríguez',
      fecha: '2026-01-20 10:32 AM',
      resultado: 'Promesa de pago',
      comentario: 'Cliente indica que realizará pago parcial el viernes.'
    },
    {
      usuario: 'Ana López',
      fecha: '2026-01-18 03:15 PM',
      resultado: 'No contesta',
      comentario: 'Se intentó contactar en 3 ocasiones, sin respuesta.'
    },
    {
      usuario: 'Carlos Méndez',
      fecha: '2026-01-15 09:05 AM',
      resultado: 'Contacto con familiar',
      comentario: 'Hermana informa que el cliente se encuentra fuera del país.'
    }
  ];

}
