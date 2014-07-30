define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/addressModel', 'controller/addressController'], function() {
    App.Component.AddressComponent = App.Component._CRUDComponent.extend({
        name: 'address',
        model: App.Model.AddressModel,
        listModel: App.Model.AddressList,
        controller : App.Controller.AddressController
    });
    return App.Component.AddressComponent;
});