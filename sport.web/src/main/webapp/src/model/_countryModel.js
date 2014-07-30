define([], function() {
    App.Model._CountryModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : '' ,  
		 'population' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
         return this.get(name);
        }
    });

    App.Model._CountryList = Backbone.Collection.extend({
        model: App.Model._CountryModel,
        initialize: function() {
        }

    });
    return App.Model._CountryModel;
});