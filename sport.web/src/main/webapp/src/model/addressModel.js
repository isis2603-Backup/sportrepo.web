define(['model/_addressModel'], function() {
    App.Model.AddressModel = App.Model._AddressModel.extend({

    });

    App.Model.AddressList = App.Model._AddressList.extend({
        model: App.Model.AddressModel
    });

    return  App.Model.AddressModel;

});