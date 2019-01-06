import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './../view/nav-bar.component.html',
  styleUrls: [
    './../view/nav-bar.component.css'
  ]
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //#################################################################################
    //# BLOCO RESPONSAVEL POR GERENCIAR/FORNECER O DROPDOW ANINHADO
    //#################################################################################
    $('.dropdown-menu a.dropdown-toggle').on('click', function (e) {
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
      });
      return false;
    });
  }

}
