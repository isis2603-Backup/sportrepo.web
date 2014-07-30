define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/cityModel', 'controller/cityController'], function() {
    App.Component.CityComponent = App.Component._CRUDComponent.extend({
        name: 'city',
        model: App.Model.CityModel,
        listModel: App.Model.CityList,
        controller : App.Controller.CityController
    });
    return App.Component.CityComponent;
});