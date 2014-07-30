define([], function() {
    App.Model._SportModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : '' ,  
		 'minAge' : '' ,  
		 'maxAge' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
         return this.get(name);
        }
    });

    App.Model._SportList = Backbone.Collection.extend({
        model: App.Model._SportModel,
        initialize: function() {
        }

    });
    return App.Model._SportModel;
});