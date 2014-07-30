define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/userModel', 'controller/userController'], function() {
    App.Component.UserComponent = App.Component._CRUDComponent.extend({
        name: 'user',
        model: App.Model.UserModel,
        listModel: App.Model.UserList,
        controller : App.Controller.UserController
    });
    return App.Component.UserComponent;
});