define(['model/_userModel'], function() {
    App.Model.UserModel = App.Model._UserModel.extend({

    });

    App.Model.UserList = App.Model._UserList.extend({
        model: App.Model.UserModel
    });

    return  App.Model.UserModel;

});