import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {
  listTarjetas: any[] = [] ;
  form: FormGroup;
  id:number | undefined;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]

    });


  }

  ngOnInit(): void {
     this.obtenerTarjetas();
  }

  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listTarjetas=data;
    }, error => {
      console.log(error);
    });

  }

  guardarTarjeta(){
if(this.id==undefined){
    this.agregarTarjeta();
  }
  else{
    const tarjetas: any = {
      id:this.id,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }


    this._tarjetaService.updateTarjeta(this.id,tarjetas).subscribe(data=>{
      this.toastr.success('La tarjeta fué registrada con exito', 'Tarjeta Registrada!');
      this.obtenerTarjetas();
      this.form.reset();

    },error=>{
      this.toastr.error('Ocurrió un error al guardar la tarjeta','Error al guardar tarjeta');
      console.log("El error es :" + error);
      
    });
    

      
  }
}

  agregarTarjeta() {

    console.log(this.form);

    const tarjetas: any = {
      id:0,
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    }
    if (this.form.valid) {
      /*this.listTarjetas.push(tarjetas);*/
        this._tarjetaService.saveTarjeta(tarjetas).subscribe(data=>{
        this.toastr.success('La tarjeta fué registrada con exito', 'Tarjeta Registrada!');
        this.obtenerTarjetas();
        this.form.reset();

      },error=>{
        this.toastr.error('Ocurrió un error al guardar la tarjeta','Error al guardar tarjeta');
        console.log(error);
      });
      
    }
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deleteTarjeta(id).subscribe(data=>{
      this.toastr.info("Tarjeta Eliminada", "Tarjeta Eliminada");
      this.obtenerTarjetas();

    },error=>{
      console.log(error);
      alert();
    });
    

  }

  editarTarjeta(tarjeta: any) {
    this.id = tarjeta.id;
    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv

    });



  }

}
