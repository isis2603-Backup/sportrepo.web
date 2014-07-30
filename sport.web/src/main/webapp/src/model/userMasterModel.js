define(['model/_userMasterModel'], function() { 
    App.Model.UserMasterModel = App.Model._UserMasterModel.extend({
		initialize: function() {
            this.on('invalid', function(model,error) {
                Backbone.trigger('user-master-model-error', error);
            });
        },
        validate: function(attrs, options){
        	var modelMaster = new App.Model.UserModel();
        	if(modelMaster.validate){
            	return modelMaster.validate(attrs.userEntity,options);
            }
        }
    });

    App.Model.UserMasterList = App.Model._UserMasterList.extend({
        model: App.Model.UserMasterModel
    });

    return  App.Model.UserMasterModel;

});