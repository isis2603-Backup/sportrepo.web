define(['model/cityModel'], function(cityModel) {
    App.Controller._CityController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#city').html());
            this.listTemplate = _.template($('#cityList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'city-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'city-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'city-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'city-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-city-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'city-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-city-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-city-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-city-create', {view: this});
                this.currentCityModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-city-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-city-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-city-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-city-list', {view: this, data: data});
                var self = this;
				if(!this.cityModelList){
                 this.cityModelList = new this.listModelClass();
				}
                this.cityModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-city-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'city-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-city-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-city-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-city-edit', {view: this, id: id, data: data});
                if (this.cityModelList) {
                    this.currentCityModel = this.cityModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-city-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentCityModel = new this.modelClass({id: id});
                    this.currentCityModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-city-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'city-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-city-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-city-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-city-delete', {view: this, id: id});
                var deleteModel;
                if (this.cityModelList) {
                    deleteModel = this.cityModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-city-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'city-delete', view: self, error: error});
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
				App.Utils.getComponentList('countryComponent',listDataReady,'countryComponent');
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-cityForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-city-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-city-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-city-save', {view: this, model : model});
                this.currentCityModel.set(model);
                this.currentCityModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-city-save', {model: self.currentCityModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'city-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({citys: self.cityModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({city: self.currentCityModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				    ,country: self.countryComponent
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._CityController;
});