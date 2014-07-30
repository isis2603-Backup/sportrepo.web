define(['model/roleModel'], function(roleModel) {
    App.Controller._RoleController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#role').html());
            this.listTemplate = _.template($('#roleList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'role-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'role-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'role-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'role-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-role-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'role-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-role-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-role-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-role-create', {view: this});
                this.currentRoleModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-role-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-role-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-role-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-role-list', {view: this, data: data});
                var self = this;
				if(!this.roleModelList){
                 this.roleModelList = new this.listModelClass();
				}
                this.roleModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-role-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'role-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-role-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-role-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-role-edit', {view: this, id: id, data: data});
                if (this.roleModelList) {
                    this.currentRoleModel = this.roleModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-role-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentRoleModel = new this.modelClass({id: id});
                    this.currentRoleModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-role-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'role-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-role-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-role-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-role-delete', {view: this, id: id});
                var deleteModel;
                if (this.roleModelList) {
                    deleteModel = this.roleModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-role-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'role-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-roleForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-role-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-role-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-role-save', {view: this, model : model});
                this.currentRoleModel.set(model);
                this.currentRoleModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-role-save', {model: self.currentRoleModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'role-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({roles: self.roleModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({role: self.currentRoleModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._RoleController;
});