define(['model/addressModel'], function(addressModel) {
    App.Controller._AddressController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#address').html());
            this.listTemplate = _.template($('#addressList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'address-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'address-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'address-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'address-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-address-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'address-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-address-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-address-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-address-create', {view: this});
                this.currentAddressModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-address-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-address-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-address-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-address-list', {view: this, data: data});
                var self = this;
				if(!this.addressModelList){
                 this.addressModelList = new this.listModelClass();
				}
                this.addressModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-address-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'address-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-address-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-address-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-address-edit', {view: this, id: id, data: data});
                if (this.addressModelList) {
                    this.currentAddressModel = this.addressModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-address-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentAddressModel = new this.modelClass({id: id});
                    this.currentAddressModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-address-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'address-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-address-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-address-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-address-delete', {view: this, id: id});
                var deleteModel;
                if (this.addressModelList) {
                    deleteModel = this.addressModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-address-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'address-delete', view: self, error: error});
                    }
                });
            }
        },
		_loadRequiredComponentsData: function(callBack) {
            var self = this;
            var listReady = _.after(1, function(){
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
				App.Utils.getComponentList('cityComponent',listDataReady,'cityComponent');
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-addressForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-address-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-address-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-address-save', {view: this, model : model});
                this.currentAddressModel.set(model);
                this.currentAddressModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-address-save', {model: self.currentAddressModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'address-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({addresss: self.addressModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({address: self.currentAddressModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				    ,city: self.cityComponent
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._AddressController;
});