define(['controller/messageController'], function(Messages) {
    App.Component.BasicComponent = function() {
    
    };
    App.Component.BasicComponent.extend = Backbone.View.extend;

    App.Component._CRUDComponent = App.Component.BasicComponent.extend({
        initialize: function(options) {
            var self = this;
            this.componentId = _.random(0, 100) + "";
            this.configuration = App.Utils.loadComponentConfiguration(this.name);
            if (options) {
                if (options.modelClass) {
                    this.model = options.modelClass;
                }
                if (options.listModelClass) {
                    this.listModel = options.listModelClass;
                }
            }
            App.Utils.loadTemplate(this.name);
            this.model.prototype.urlRoot = this.configuration.context;
            this.listModel.prototype.url = this.configuration.context;
            this.el = this.configuration.el;
            this.componentController = new this.controller({modelClass: this.model, listModelClass: this.listModel, componentId: this.componentId});
            this.toolbarModel = new App.Model.ToolbarModel({name: this.name, componentId: this.componentId, showComponentList: true, components: App.components});
            this.toolbarController = new App.Controller.ToolbarController({model: this.toolbarModel, componentId: this.componentId});
            Backbone.on(self.componentController.componentId + '-toolbar-create', function() {
                self.toolbarController.model.set({showSave: true, showCancel: true});
                Backbone.trigger(self.componentController.componentId + '-' + self.name + '-create');
            });
            Backbone.on(self.componentController.componentId + '-toolbar-cancel', function() {
                self.toolbarController.model.set({showSave: false, showCancel: false});
                Backbone.trigger(self.componentController.componentId + '-' + self.name + '-list');
            });
            Backbone.on(self.componentController.componentId + '-pre-' + self.name + '-edit', function() {
                self.toolbarController.model.set({showSave: true, showCancel: true});
            });
            Backbone.on(self.componentController.componentId + '-toolbar-save', function() {
                Backbone.trigger(self.componentController.componentId + '-' + self.name + '-save');
            });
            Backbone.on(self.componentController.componentId + '-post-' + self.name + '-save', function() {
                self.toolbarController.model.set({showSave: false, showCancel: false});
                Backbone.trigger(self.componentController.componentId + '-' + self.name + '-list');
                var messagesController = new Messages({el: '#' + self.messageDomId});
                messagesController.showMessage('info', 'The ' + self.name + ' has been successfully saved.', true, 3);
            });
            Backbone.on(self.componentController.componentId + '-post-' + self.name + '-delete', function() {
                self.toolbarController.model.set({showSave: false, showCancel: false});
                var messagesController = new Messages({el: '#' + self.messageDomId});
                messagesController.showMessage('info', 'The ' + self.name + ' has been successfully deleted.', true, 3);
            });
            Backbone.on(self.componentController.componentId + '-toolbar-refresh', function() {
                self.toolbarController.model.set({showSave: false, showCancel: false});
                Backbone.trigger(self.componentController.componentId + '-' + self.name + '-list');
            });
            Backbone.on(self.componentController.componentId + '-error', function(params) {
                var messagesController = new Messages({el: '#' + self.messageDomId});
                var error = '';
                if (params.error) {
                    error = params.error.responseText;
                } else {
                    error = params.message;
                }
                messagesController.showMessage('danger', 'Error executing ' + params.event + ". Message: " + error, true);
            });

            Backbone.on(self.componentController.componentId + '-add-button', function(params) {
                var i = self.toolbarModel.get('buttons').length;
                var id = 1;
                if (i != 0) {
                    id = self.toolbarModel.get('buttons')[i - 1].id + 1;
                }
                self.toolbarModel.get('buttons')[i] = {
                    id: id,
                    name: params.name,
                    icon: params.icon,
                    event: params.event,
                    show: true
                };
                Backbone.on(self.componentController.componentId + '-toolbar-button' + id, function(paramsButton) {
                    Backbone.trigger(params.event, {});
                });
            });

            Backbone.on(self.componentController.componentId + '-remove-button', function(params) {
                for (var i = 0; i < self.toolbarModel.get('buttons').length; i++) {
                    if (params.name == self.toolbarModel.get('buttons')[i].name) {
                        Backbone.off(self.componentController.componentId + '-toolbar-button' + self.toolbarModel.get('buttons')[i].id);
                        self.toolbarModel.buttons.splice(i, 1);
                    }
                }
            });

            Backbone.on(self.componentController.componentId + '-show-button', function(params) {
                for (var i = 0; i < self.toolbarModel.get('buttons').length; i++) {
                    if (params.name == self.toolbarModel.get('buttons')[i].name) {
                        self.toolbarModel.get('buttons')[i].show = true;
                        self.toolbarController.render();
                    }
                }
            });

            Backbone.on(self.componentController.componentId + '-hide-button', function(params) {
                for (var i = 0; i < self.toolbarModel.get('buttons').length; i++) {
                    if (params.name == self.toolbarModel.get('buttons')[i].name) {
                        self.toolbarModel.get('buttons')[i].show = false;
                        self.toolbarController.render();
                    }
                }
            });

            if (this.postInit) {
                this.postInit();
            }
        },
        setToolbarModel: function(model) {
            this.model = model;
            this.toolbarController = new App.Controller.ToolbarController({model: model, componentId: this.componentId});
        },
        render: function(domElementId) {
            var self = this;
            if (domElementId) {
                var rootElement = $('#' + domElementId);
                this.toolbarDomId = this.componentId + "-" + domElementId + "-toolbar";
                this.messageDomId = this.componentId + "-" + domElementId + "-messages";
                this.contentDomId = this.componentId + "-" + domElementId + "-content";
                rootElement.append("<div id=" + this.toolbarDomId + "></div>");
                rootElement.append("<div id=" + this.messageDomId + "></div>");
                rootElement.append("<div id=" + this.contentDomId + "></div>");
                this.toolbarController.setElement('#' + this.toolbarDomId);
                this.componentController.setElement('#' + this.contentDomId);
            }
            if (this.componentController._loadRequiredComponentsData) {
                this.componentController._loadRequiredComponentsData(function() {
                    self.toolbarController.render();
                    self.componentController.list();
                });
            } else {
                self.toolbarController.render();
                self.componentController.list();
            }
        }
    });
    return App.Component._CRUDComponent;
});