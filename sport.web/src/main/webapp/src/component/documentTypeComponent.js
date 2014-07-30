define(['component/_CRUDComponent', 'controller/toolbarController', 'model/toolbarModel', 'model/documentTypeModel', 'controller/documentTypeController'], function() {
    App.Component.DocumentTypeComponent = App.Component._CRUDComponent.extend({
        name: 'documentType',
        model: App.Model.DocumentTypeModel,
        listModel: App.Model.DocumentTypeList,
        controller : App.Controller.DocumentTypeController
    });
    return App.Component.DocumentTypeComponent;
});