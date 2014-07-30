define(['controller/selectionController', 'model/cacheModel', 'model/userMasterModel', 'component/_CRUDComponent', 'controller/tabController', 'component/userComponent',
 'component/addressComponent'
 ,
 'component/sportComponent'
 
 ],function(SelectionController, CacheModel, UserMasterModel, CRUDComponent, TabController, UserComponent,
 AddressComponent
 ,
 SportComponent
 ) {
    App.Component.UserMasterComponent = App.Component.BasicComponent.extend({
        initialize: function() {
            var self = this;
            this.configuration = App.Utils.loadComponentConfiguration('userMaster');
            var uComponent = new UserComponent();
            uComponent.initialize();
            uComponent.render('main');
            Backbone.on(uComponent.componentId + '-post-user-create', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-post-user-edit', function(params) {
                self.renderChilds(params);
            });
            Backbone.on(uComponent.componentId + '-pre-user-list', function() {
                self.hideChilds();
            });
            Backbone.on('user-master-model-error', function(error) {
                Backbone.trigger(uComponent.componentId + '-' + 'error', {event: 'user-master-save', view: self, error: error});
            });
            Backbone.on(uComponent.componentId + '-instead-user-save', function(params) {
                self.model.set('userEntity', params.model);
                if (params.model) {
                    self.model.set('id', params.model.id);
                } else {
                    self.model.unset('id');
                }
                var addressModels = self.addressComponent.componentController.addressModelList;
                self.model.set('listAddress', []);
                self.model.set('createAddress', []);
                self.model.set('updateAddress', []);
                self.model.set('deleteAddress', []);
                for (var i = 0; i < addressModels.models.length; i++) {
                    var m = addressModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createAddress').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateAddress').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < addressModels.deletedModels.length; i++) {
                    var m = addressModels.deletedModels[i];
                    self.model.get('deleteAddress').push(m.toJSON());
                }
                var sportModels = self.sportComponent.componentController.sportModelList;
                self.model.set('listSport', []);
                self.model.set('createSport', []);
                self.model.set('updateSport', []);
                self.model.set('deleteSport', []);
                for (var i = 0; i < sportModels.models.length; i++) {
                    var m = sportModels.models[i];
                    var modelCopy = m.clone();
                    if (m.isCreated()) {
                        //set the id to null
                        modelCopy.unset('id');
                        self.model.get('createSport').push(modelCopy.toJSON());
                    } else if (m.isUpdated()) {
                        self.model.get('updateSport').push(modelCopy.toJSON());
                    }
                }
                for (var i = 0; i < sportModels.deletedModels.length; i++) {
                    var m = sportModels.deletedModels[i];
                    self.model.get('deleteSport').push(m.toJSON());
                }
                self.model.save({}, {
                    success: function() {
                        uComponent.componentController.list();
                    },
                    error: function(error) {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-master-save', view: self, error: error});
                    }
                });
            });
        },
        renderChilds: function(params) {
            var self = this;
            this.tabModel = new App.Model.TabModel(
                    {
                        tabs: [
                            {label: "Address", name: "address", enable: true},
                            ,
                            {label: "Sport", name: "sport", enable: true},
                        ]
                    }
            );

            this.tabs = new TabController({model: this.tabModel});

            this.tabs.render('tabs');
            App.Model.UserMasterModel.prototype.urlRoot = this.configuration.context;
            var options = {
                success: function() {
					self.addressComponent = new AddressComponent();
                    self.addressModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.AddressModel), self.model.get('listAddress'));
                    self.addressComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.AddressModel),
                        listModelClass: App.Utils.createCacheList(App.Model.AddressModel, App.Model.AddressList, self.addressModels)
                    });
                    self.addressComponent.render(self.tabs.getTabHtmlId('address'));
                    Backbone.on(self.addressComponent.componentId + '-post-address-create', function(params) {
                        params.view.currentAddressModel.setCacheList(params.view.addressModelList);
                    });
					self.sportComponent = new SportComponent();
                    self.sportModels = App.Utils.convertToModel(App.Utils.createCacheModel(App.Model.SportModel), self.model.get('listSport'));
                    self.sportComponent.initialize({
                        modelClass: App.Utils.createCacheModel(App.Model.SportModel),
                        listModelClass: App.Utils.createCacheList(App.Model.SportModel, App.Model.SportList, self.sportModels)
                    });
                    self.sportComponent.render(self.tabs.getTabHtmlId('sport'));
                    Backbone.on(self.sportComponent.componentId + '-post-sport-create', function(params) {
                        params.view.currentSportModel.setCacheList(params.view.sportModelList);
                    });
                    self.addressToolbarModel = self.addressComponent.toolbarModel.set(App.Utils.Constans.referenceToolbarConfiguration);
                    self.addressComponent.setToolbarModel(self.addressToolbarModel);                    
                    self.sportToolbarModel = self.sportComponent.toolbarModel.set(App.Utils.Constans.containmentToolbarConfiguration);
                    self.sportComponent.setToolbarModel(self.sportToolbarModel);
                	
                     
                
                    Backbone.on(self.sportComponent.componentId + '-toolbar-add', function() {
                        var selection = new App.Controller.SelectionController();
                        App.Utils.getComponentList('sportComponent', function(componentName, model) {
                            if (model.models.length == 0) {
                                alert('There is no sports to select.');
                            } else {
                                selection.showSelectionList({list: model, name: 'name', title: 'Sport List'});
                            }
                            ;
                        });
                    });
                    Backbone.on('post-selection', function(models) {
                        var cacheSportModel = App.Utils.createCacheModel(App.Model.SportModel);
                        models = App.Utils.convertToModel(cacheSportModel, models);
                        for (var i = 0; i < models.length; i++) {
                        	var model = models[i];
                        	model.setCacheList(self.sportComponent.componentController.sportModelList);
                        	model.save('',{});
                        }
                        self.sportComponent.componentController.showEdit=false;
                        self.sportComponent.componentController.list();
                        
                    });
                    $('#tabs').show();
                },
                error: function() {
                    Backbone.trigger(self.componentId + '-' + 'error', {event: 'user-edit', view: self, id: id, data: data, error: error});
                }
            };
            if (params.id) {
                self.model = new App.Model.UserMasterModel({id: params.id});
                self.model.fetch(options);
            } else {
                self.model = new App.Model.UserMasterModel();
                options.success();
            }


        },
        hideChilds: function() {
            $('#tabs').hide();
        }
    });

    return App.Component.UserMasterComponent;
});