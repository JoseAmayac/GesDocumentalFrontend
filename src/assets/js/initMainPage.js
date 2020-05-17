"use strict";
var AppMia = {
    initMainPage: function () {
        $('body').Layout();
        $('[data-widget="pushmenu"]').PushMenu();
        // $('[data-widget="treeview"]').Treeview('init');
        $(document).ready(() => {
            $('[data-widget="treeview"]').Treeview('init');
        });
    }
}