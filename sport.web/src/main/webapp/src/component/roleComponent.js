define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/roleModel', 'controller/roleController'], function() {
    App.Component.RoleComponent = App.Component._CRUDComponent.extend({
        name: 'role',
        model: App.Model.RoleModel,
        listModel: App.Model.RoleList,
        controller : App.Controller.RoleController
    });
    return App.Component.RoleComponent;
});