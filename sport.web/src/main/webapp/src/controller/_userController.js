define(['model/userModel'], function(userModel) {
    App.Controller._UserController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#user').html());
            this.listTemplate = _.template($('#userList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'user-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'user-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'user-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'user-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-user-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'user-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-user-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-create', {view: this});
                this.currentUserModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-user-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-user-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-list', {view: this, data: data});
                var self = this;
				if(!this.userModelList){
                 this.userModelList = new this.listModelClass();
				}
                this.userModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-user-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-user-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-edit', {view: this, id: id, data: data});
                if (this.userModelList) {
                    this.currentUserModel = this.userModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-user-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentUserModel = new this.modelClass({id: id});
                    this.currentUserModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-user-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-user-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-delete', {view: this, id: id});
                var deleteModel;
                if (this.userModelList) {
                    deleteModel = this.userModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-user-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-delete', view: self, error: error});
                    }
                });
            }
        },
		_loadRequiredComponentsData: function(callBack) {
            var self = this;
            var listReady = _.after(2, function(){
                callBack();
            }); 
            var listDataReady = function(componentName, model, aliasModel){
            if(aliasModel){
                self[aliasModel] = model;
            } else {
            	self[componentName] = model;
            }    
                listReady();
            };
				App.Utils.getComponentList('documentTypeComponent',listDataReady,'documentTypeComponent');
				App.Utils.getComponentList('roleComponent',listDataReady,'roleComponent');
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-userForm').serializeObject();
 
			 if(!model.enable){
			 	model.enable=false
			 } 
            if (App.Utils.eventExists(this.componentId + '-' +'instead-user-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-user-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-user-save', {view: this, model : model});
                this.currentUserModel.set(model);
                this.currentUserModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-user-save', {model: self.currentUserModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({users: self.userModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({user: self.currentUserModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				    ,documentType: self.documentTypeComponent
 
				    ,role: self.roleComponent
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._UserController;
});