define([], function() {
    App.Model._CityModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : '' ,  
		 'population' : '' ,  
		 'countryId' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
			 if(name=='countryId'){  
                 var value = App.Utils.getModelFromCache('countryComponent',this.get('countryId'));
                 if(value) 
                 return value.get('name');
             }
         return this.get(name);
        }
    });

    App.Model._CityList = Backbone.Collection.extend({
        model: App.Model._CityModel,
        initialize: function() {
        }

    });
    return App.Model._CityModel;
});