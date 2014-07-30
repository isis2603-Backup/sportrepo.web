define([], function() {
    App.Model._DocumentTypeModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : '' ,  
		 'length' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
         return this.get(name);
        }
    });

    App.Model._DocumentTypeList = Backbone.Collection.extend({
        model: App.Model._DocumentTypeModel,
        initialize: function() {
        }

    });
    return App.Model._DocumentTypeModel;
});