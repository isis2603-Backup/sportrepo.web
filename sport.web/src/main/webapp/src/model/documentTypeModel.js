define(['model/_documentTypeModel'], function() {
    App.Model.DocumentTypeModel = App.Model._DocumentTypeModel.extend({

    });

    App.Model.DocumentTypeList = App.Model._DocumentTypeList.extend({
        model: App.Model.DocumentTypeModel
    });

    return  App.Model.DocumentTypeModel;

});