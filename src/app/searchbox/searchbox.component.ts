/**
 * La clase "NgModel" es una clase de Angular que sirve para
 * modelar elementos interactivos como un input.
 * "NgModel" ofrece tambien la propiedad "valueChanges" que es un Observable
 * de RxJS que emite eventos cada vez que hay un cambio en el input.
 *
 * El objeto di output "value" es de tipo "EventEmitter" y emite eventos
 * que puede recibir el componente padre para ser consumidos.
 *
 * La clase "EventEmitter" hereda de la clase "Subject" de RxJS.
*/
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {
  @ViewChild('searchBox') public searchBox:NgModel;
  @Output() value: EventEmitter<string> = new EventEmitter();
  public text: string = '';

  constructor() { }

  // Antes de usar RxJS
  /*
   * En el subscribe() de "valueChanges" a traves del output "value" emito
   * el texto de busqueda cada vez que se recibe un cambio.
  ngOnInit() {
    this.searchBox.valueChanges.subscribe(evt => this.value.emit(evt));
  }*/


  // Con RxJS
  /**
   * Antes de la suscripcion, utilizo el metodo "pipe" para anadir
   * el operador "debounceTime"
   */
  ngOnInit() {
    this.searchBox.valueChanges.pipe(
      debounceTime(300)
    )
    .subscribe(evt => this.value.emit(evt));
  }

}
