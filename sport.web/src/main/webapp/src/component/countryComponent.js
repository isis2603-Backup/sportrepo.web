define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/countryModel', 'controller/countryController'], function() {
    App.Component.CountryComponent = App.Component._CRUDComponent.extend({
        name: 'country',
        model: App.Model.CountryModel,
        listModel: App.Model.CountryList,
        controller : App.Controller.CountryController
    });
    return App.Component.CountryComponent;
});