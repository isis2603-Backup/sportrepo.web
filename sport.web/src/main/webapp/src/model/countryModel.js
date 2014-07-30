define(['model/_countryModel'], function() {
    App.Model.CountryModel = App.Model._CountryModel.extend({

    });

    App.Model.CountryList = App.Model._CountryList.extend({
        model: App.Model.CountryModel
    });

    return  App.Model.CountryModel;

});