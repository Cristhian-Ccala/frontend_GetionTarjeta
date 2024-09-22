import { Component, inject, OnInit } from '@angular/core';
import { TarjetaService } from '../../service/tarjeta.service';
import { Tarjeta } from '../../models/tarjeta.interface';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarjeta-list',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './tarjeta-list.component.html',
  styleUrl: './tarjeta-list.component.css'
})
export default class TarjetaListComponent implements OnInit {

  private tarjetaService = inject(TarjetaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  listTarjetas: Tarjeta[] = [];
  tarjeta?: Tarjeta;
  formTarjeta: FormGroup = new FormGroup({});
  isUpdate: boolean = false;

  ngOnInit(): void {
    this.listar();
    this.formTarjeta = this.fb.group({
      nombre: ['', [Validators.required]],
      num_tarjeta: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      estado: ['1', [Validators.required]],
    });
  }

  listar() {
    this.tarjetaService.list().subscribe(tarj => {
      if(tarj){
        this.listTarjetas = tarj;
      }
    });
  }

  nuevo() {
    this.isUpdate = false;
    this.formTarjeta.reset();
  }

  guardar() {
    this.formTarjeta.controls['estado'].setValue(1);
    this.tarjetaService.create(this.formTarjeta.value).subscribe(tarj => {
      if(tarj){
        this.listar();
        this.formTarjeta.reset();
      }
    });  
  }

  seleccionar(tarjeta: Tarjeta) { 
    this.isUpdate = true;
    this.tarjetaService.findById(tarjeta.id_tarjeta).subscribe(tarj =>{
      this.tarjeta = tarj;
      this.formTarjeta = this.fb.group({
        nombre: [tarj.nombre, [Validators.required]],
        num_tarjeta: [tarj.num_tarjeta, [Validators.required]],
        tipo: [tarj.tipo, [Validators.required]],
        cvv: [tarj.cvv, [Validators.required]],
        estado: [tarj.estado, [Validators.required]],
      });
    });

  }

  eliminar(tarjeta: Tarjeta){
    this.tarjetaService.delete(tarjeta.id_tarjeta).subscribe(() =>{
        this.listar();
    });
  }

  editar() {
    const tarjetform = this.formTarjeta.value;
    console.log(tarjetform);
    tarjetform.id_tarjeta = this.tarjeta?.id_tarjeta;
    //tarjetform.estado = this.tarjeta?.estado;
    console.log(tarjetform);
    this.tarjetaService.update(tarjetform).subscribe(() =>{
      this.listar();
      this.formTarjeta.reset();
    });
  }
}
