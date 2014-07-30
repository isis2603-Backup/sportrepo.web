define([], function() {
    App.Model._UserModel = Backbone.Model.extend({
        defaults: {
 
		 'userName' : '' ,  
		 'firstName' : '' ,  
		 'lastName' : '' ,  
		 'birthDate' : '' ,  
		 'enable' :  false  ,  
		 'docNumber' : '' ,  
		 'documenttypeId' : '' ,  
		 'roleId' : ''        },
        initialize: function() {
        },
        getDisplay: function(name) {
             if(name=='birthDate'){
                   var dateConverter = App.Utils.Converter.date;
                   return dateConverter.unserialize(this.get('birthDate'), this);
             }
			 if(name=='documenttypeId'){  
                 var value = App.Utils.getModelFromCache('documentTypeComponent',this.get('documenttypeId'));
                 if(value) 
                 return value.get('name');
             }
			 if(name=='roleId'){  
                 var value = App.Utils.getModelFromCache('roleComponent',this.get('roleId'));
                 if(value) 
                 return value.get('name');
             }
         return this.get(name);
        }
    });

    App.Model._UserList = Backbone.Collection.extend({
        model: App.Model._UserModel,
        initialize: function() {
        }

    });
    return App.Model._UserModel;
});