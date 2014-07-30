define(['model/countryModel'], function(countryModel) {
    App.Controller._CountryController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#country').html());
            this.listTemplate = _.template($('#countryList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'country-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'country-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'country-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'country-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-country-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'country-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-country-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-country-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-country-create', {view: this});
                this.currentCountryModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-country-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-country-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-country-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-country-list', {view: this, data: data});
                var self = this;
				if(!this.countryModelList){
                 this.countryModelList = new this.listModelClass();
				}
                this.countryModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-country-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'country-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-country-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-country-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-country-edit', {view: this, id: id, data: data});
                if (this.countryModelList) {
                    this.currentCountryModel = this.countryModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-country-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentCountryModel = new this.modelClass({id: id});
                    this.currentCountryModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-country-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'country-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-country-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-country-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-country-delete', {view: this, id: id});
                var deleteModel;
                if (this.countryModelList) {
                    deleteModel = this.countryModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-country-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'country-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-countryForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-country-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-country-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-country-save', {view: this, model : model});
                this.currentCountryModel.set(model);
                this.currentCountryModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-country-save', {model: self.currentCountryModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'country-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({countrys: self.countryModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({country: self.currentCountryModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._CountryController;
});