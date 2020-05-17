import { Component, OnInit, OnDestroy, SimpleChanges, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
declare var $:any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() usuario:Usuario;
  
  constructor(private service:AuthService) { }

  ngOnInit() {
    // $('body').removeClass('sidebar-collapse');

    this.verifyClass();

    $(document).ready(()=>{
      Array.from($('.nav-link')).forEach(enlace=>{
        $(enlace).click(()=>{
          this.verifyClass()
        })
      })
    })
  }

  ngOnDestroy(): void {
    // $('body').removeClass('hold-transition sidebar-mini layout-fixed');
  }

  verifyClass(){
    Array.from($('a.link_arriba')).forEach(link => {
      let nietos = $(link).siblings().children().children()
      setTimeout(() => {
        if ($(nietos).hasClass('active')) {
          $(link).addClass('active')
        }else{
          $(link).removeClass('active')
        }
      }, 200);
    });
  }
}
