import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Gestion {
  resultado: string;
  accion: string;
  comentario: string;
  fecha: string;
  usuario: string;
}

interface Cuenta {
  Referencia: string;
  tipoCartera: string;
  RangodeMora: string;
  ESTADO: string;
  tipoproducto: string;
  subtipoproduc: string;
  CAPITAL: number;
  TOTALDEUDA: number;
  FECHAOTORGAMIENTO: string;
  FECHAVENCIMIENTO: string;
  FECHACASTIGO: string;
  FECHAULTPAG: string;
  OTRO_CREDITO_AL_DIA: string;
  Direccion: string;
  Municipio: string;
  Departamento: string;
  Estrategia_Global: string;
  Telefonos: string;
  GESTOR: string;
  Grupo: string;
  gestiones: Gestion[];
}

@Component({
  selector: 'app-gestiones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestiones.component.html',
  styleUrls: ['./gestiones.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GestionesComponent {

  trackByReferencia(index: number, item: Cuenta): string {
    return item.Referencia;
  }

  cliente = {
    NIUCliente: '158734921',
    NombreSociedad: 'RIVERA LOPEZ, MARIA FERNANDA',
    NumeroDUI: '012345678'
  };

  cuentas: Cuenta[] = [
    {
      Referencia: '4550098745123698',
      tipoCartera: 'Cartera Castigada',
      RangodeMora: '120-150 días',
      ESTADO: 'SANE',
      tipoproducto: 'Tarjeta de Crédito',
      subtipoproduc: 'CONS',
      CAPITAL: 265.90,
      TOTALDEUDA: 289.45,
      FECHAOTORGAMIENTO: '15/08/2003',
      FECHAVENCIMIENTO: '22/11/2031',
      FECHACASTIGO: '10/02/2011',
      FECHAULTPAG: '18/12/2010',
      OTRO_CREDITO_AL_DIA: 'NO',
      Direccion: '3A AV NTE #12-4',
      Municipio: 'Ahuachapán',
      Departamento: 'Ahuachapán',
      Estrategia_Global: 'Tarjeta de Crédito',
      Telefonos: '24139876 / 0 / 0',
      GESTOR: 'ISRAEL',
      Grupo: 'Intercall B',
      gestiones: []
    },
    {
      Referencia: '4550098745129876',
      tipoCartera: 'Judicial',
      RangodeMora: '35-60 días',
      ESTADO: 'Activo',
      tipoproducto: 'Crédito Personal',
      subtipoproduc: 'PRIV',
      CAPITAL: 1500,
      TOTALDEUDA: 1800.5,
      FECHAOTORGAMIENTO: '01/03/2018',
      FECHAVENCIMIENTO: '01/03/2023',
      FECHACASTIGO: 'N/A',
      FECHAULTPAG: '15/01/2023',
      OTRO_CREDITO_AL_DIA: 'SI',
      Direccion: 'Calle El Progreso #23',
      Municipio: 'San Salvador',
      Departamento: 'San Salvador',
      Estrategia_Global: 'Crédito Personal',
      Telefonos: '22223333 / 7777',
      GESTOR: 'MARIA',
      Grupo: 'Judicial A',
      gestiones: []
    },
    {
      Referencia: '4550098745130001',
      tipoCartera: 'Intercall B',
      RangodeMora: '5-10 días',
      ESTADO: 'En Mora',
      tipoproducto: 'Microcrédito',
      subtipoproduc: 'MIC',
      CAPITAL: 500,
      TOTALDEUDA: 550,
      FECHAOTORGAMIENTO: '10/06/2022',
      FECHAVENCIMIENTO: '10/12/2022',
      FECHACASTIGO: 'N/A',
      FECHAULTPAG: '01/12/2022',
      OTRO_CREDITO_AL_DIA: 'SI',
      Direccion: 'Colonia San Benito #45',
      Municipio: 'Santa Tecla',
      Departamento: 'La Libertad',
      Estrategia_Global: 'Microcrédito',
      Telefonos: '78889999 / 3333',
      GESTOR: 'JUAN',
      Grupo: 'Intercall B',
      gestiones: []
    }
  ];

  cuentaActiva: Cuenta = this.cuentas[0];

  aplicarATodas = false;

  mapa: Record<string, string[]> = {

    'ACE_ACTUALIZACION DE DATOS': [
      '1RA ACTUALIZACION',
      '2DA ACTUALIZACION'
    ],

    'GESTION_ACUERDOS DE PAGO': [
      'CANCELACION TOTAL',
      'CANCELACION TOTAL CC',
      'CULTURA DE PAGO',
      'PAGO PARCIAL',
      'PTP FUERA DE LINEA'
    ],

    'GESTION_CONTINGENCIA EXCLUSION': [
      'NO DISPUESTO A ACTUALIZAR DATOS',
      'TRAMITE EN PROCESO/ACUERDO DE PAGO'
    ],

    'GESTION_GESTIONES MASIVAS': [
      'ENVIO DE CORREO',
      'ENVIO SMS',
      'ENVIO WHATSAPP'
    ],

    'GESTION_LLAMADA COLGADA': [
      'LLAMADA COLGADA CLIENTE',
      'LLAMADA COLGADA POR TERCERO',
      'SOLICITUD DE LLAMAR POSTERIORMENTE',
      'TERCEROS NO TOMAN RECADOS'
    ],

    'GESTION_LLAMADA NO EFECTIVA': [
      'NO CONTESTA',
      'VOLVER A LLAMAR',
      'WHATSAPP NO CONTESTADO',
      'TELEFONOS INACCESIBLES',
      'TELEFONO NO CONTESTADO'
    ],

    'GESTION_NEGATIVA DE PAGO': [
      'CLIENTE NO ACEPTO ALTERNATIVA DE SOLUCION',
      'CLIENTE NO ACEPTO CREDITO',
      'DESEMPLEO',
      'DISMINUCION DE INGRESOS FIJO',
      'EMBARGO DE SUELDO',
      'GARANTIA ALQUILADA',
      'GASTOS PERSONALES',
      'INCAPACIDAD O ENFERMEDAD',
      'JUBILADO',
      'NO QUIERE PAGAR',
      'OBLIGACIONES CON OTROS',
      'PDS EN PROCESO',
      'RENUENCIA DE CLIENTE'
    ],

    'GESTION_RECADOS': [
      'CASA',
      'GARANTIA',
      'NEGOCIO',
      'TERCERO',
      'TRABAJO'
    ],

    'GESTION_TELEFONO EQUIVOCADO': [
      'TELEFONOS DESACTUALIZADOS'
    ],

    'GESTION TRAMITES Y OTROS COMPROMISOS': [
      'NO ACEPTA LA OFERTA',
      'OFERTA DE PDS',
      'PAGADOR NO ACEPTA SUSTITUCION DE OID',
      'REPORTE DE FALLECIMIENTO',
      'SEGUIMIENTO A PDS',
      'SEGUIMIENTO A TRAMITE',
      'VALIDACION CON EL PAGADOR',
      'FIRMA DE DOCUMENTOS PDS',
      'RECEPCION DE DOCUMENTOS PARA TRAMITE'
    ],

    'GESTION_VOLVER A LLAMAR': [
      'NO CONTESTA',
      'SOLICITUD DE LLAMAR POSTERIORMENTE'
    ],

    'GESTION_WHATSAPP EFECTIVO': [
      'SMS CIERRE POR INACTIVIDAD',
      'SMS CONTESTADO',
      'SMS SOLO LEIDO'
    ],

    'GESTION_WHATSAPP NO EFECTIVO': [
      'SMS NO RECIBIDO',
      'SMS RECIBIDO SIN LEER'
    ],

    'VFISICA_INVESTIGACION': [
      '1 BAJO PUERTA/BUZON CONFIRMADO',
      'CLIENTE NO CONTACTADO_REVISITA EN DESARROLLO',
      'ENTREGA DE NOTIFICACION',
      'LOCALIZABLE EN HORARIOS ESPECIFICOS',
      'VALIDACION DE INFORMACION EN CAMPO',
      'VERIFICACION DE GARANTIA'
    ],

    'VFISICA_TRAMITES Y OTROS COMPROMISOS': [
      'SEGUIMIENTO A TRAMITE'
    ],

    'VFISICA_VISITA NO EFECTIVA': [
      'CAMBIO DE DOMICILIO O TRABAJO',
      'DIRECCION NO CONFIRMADA',
      'GARANTIA DESHABITADA',
      'ILOCALIZABLE',
      'PERSONA DESCONOCIDA',
      'VISITAS NO PERMITIDAS EN CASA/TRABAJO',
      'VIVIENDA DESHABITADA',
      'ZONA DE ALTO RIESGO'
    ]

  };

  mostrarModal = false;

  gestion = {
    resultado: '',
    accion: '',
    comentario: ''
  };

  cambiarCuenta(c: Cuenta) {
    this.cuentaActiva = c;
  }

  resultados(): string[] {
    return Object.keys(this.mapa);
  }

  acciones(): string[] {
    return this.mapa[this.gestion.resultado] || [];
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarGestion() {

    if (!this.gestion.resultado ||
        !this.gestion.accion ||
        !this.gestion.comentario.trim()) {
      alert('Debe completar Resultado, Acción y Comentario.');
      return;
    }

    const nueva: Gestion = {
      ...this.gestion,
      fecha: new Date().toLocaleString(),
      usuario: 'Oscar Aleman'
    };

    if (this.aplicarATodas) {
      this.cuentas.forEach(c => c.gestiones.unshift({ ...nueva }));
    } else {
      this.cuentaActiva.gestiones.unshift(nueva);
    }

    this.gestion = {
      resultado: '',
      accion: '',
      comentario: ''
    };

    this.aplicarATodas = false;

    this.cerrarModal();
  }
}
