define(['model/_cityModel'], function() {
    App.Model.CityModel = App.Model._CityModel.extend({

    });

    App.Model.CityList = App.Model._CityList.extend({
        model: App.Model.CityModel
    });

    return  App.Model.CityModel;

});