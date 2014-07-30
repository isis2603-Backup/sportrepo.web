define([], function() {
    App.Model._AddressModel = Backbone.Model.extend({
        defaults: {
 
		 'street' : '' ,  
		 'aveneu' : '' ,  
		 'cityId' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
			 if(name=='cityId'){  
                 var value = App.Utils.getModelFromCache('cityComponent',this.get('cityId'));
                 if(value) 
                 return value.get('name');
             }
         return this.get(name);
        }
    });

    App.Model._AddressList = Backbone.Collection.extend({
        model: App.Model._AddressModel,
        initialize: function() {
        }

    });
    return App.Model._AddressModel;
});