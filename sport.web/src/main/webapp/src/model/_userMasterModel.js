define([], function() {
    App.Model._UserMasterModel = Backbone.Model.extend({
     
    });

    App.Model._UserMasterList = Backbone.Collection.extend({
        model: App.Model._UserMasterModel,
        initialize: function() {
        }

    });
    return App.Model._UserMasterModel;
    
});