define(['model/documentTypeModel'], function(documentTypeModel) {
    App.Controller._DocumentTypeController = Backbone.View.extend({
        initialize: function(options) {
            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#documentType').html());
            this.listTemplate = _.template($('#documentTypeList').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
		    }
            var self = this;
            Backbone.on(this.componentId + '-' + 'documentType-create', function(params) {
                self.create(params);
            });
            Backbone.on(this.componentId + '-' + 'documentType-list', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'documentType-edit', function(params) {
                self.edit(params);
            });
            Backbone.on(this.componentId + '-' + 'documentType-delete', function(params) {
                self.destroy(params);
            });
            Backbone.on(this.componentId + '-' + 'post-documentType-delete', function(params) {
                self.list(params);
            });
            Backbone.on(this.componentId + '-' + 'documentType-save', function(params) {
                self.save(params);
            });
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-documentType-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-documentType-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-documentType-create', {view: this});
                this.currentDocumentTypeModel = new this.modelClass();
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-documentType-create', {view: this});
            }
        },
        list: function(params) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-documentType-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-documentType-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-documentType-list', {view: this, data: data});
                var self = this;
				if(!this.documentTypeModelList){
                 this.documentTypeModelList = new this.listModelClass();
				}
                this.documentTypeModelList.fetch({
                    data: data,
                    success: function() {
                        self._renderList();
                        Backbone.trigger(self.componentId + '-' + 'post-documentType-list', {view: self});
                    },
                    error: function(mode, error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'documentType-list', view: self, error: error});
                    }
                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-documentType-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-documentType-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-documentType-edit', {view: this, id: id, data: data});
                if (this.documentTypeModelList) {
                    this.currentDocumentTypeModel = this.documentTypeModelList.get(id);
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-documentType-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentDocumentTypeModel = new this.modelClass({id: id});
                    this.currentDocumentTypeModel.fetch({
                        data: data,
                        success: function() {
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-documentType-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'documentType-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-documentType-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-documentType-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-documentType-delete', {view: this, id: id});
                var deleteModel;
                if (this.documentTypeModelList) {
                    deleteModel = this.documentTypeModelList.get(id);
                } else {
                    deleteModel = new this.modelClass({id: id});
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-documentType-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'documentType-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-documentTypeForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-documentType-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-documentType-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-documentType-save', {view: this, model : model});
                this.currentDocumentTypeModel.set(model);
                this.currentDocumentTypeModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-documentType-save', {model: self.currentDocumentTypeModel});
                            },
                            error: function(error) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'documentType-save', view: self, error: error});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({documentTypes: self.documentTypeModelList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({documentType: self.currentDocumentTypeModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        }
    });
    return App.Controller._DocumentTypeController;
});