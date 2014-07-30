define([], function() {
    App.Model._RoleModel = Backbone.Model.extend({
        defaults: {
 
		 'name' : '' ,  
		 'description' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
         return this.get(name);
        }
    });

    App.Model._RoleList = Backbone.Collection.extend({
        model: App.Model._RoleModel,
        initialize: function() {
        }

    });
    return App.Model._RoleModel;
});