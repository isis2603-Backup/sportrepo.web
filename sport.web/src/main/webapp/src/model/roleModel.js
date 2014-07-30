define(['model/_roleModel'], function() {
    App.Model.RoleModel = App.Model._RoleModel.extend({

    });

    App.Model.RoleList = App.Model._RoleList.extend({
        model: App.Model.RoleModel
    });

    return  App.Model.RoleModel;

});