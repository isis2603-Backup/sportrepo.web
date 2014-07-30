package co.edu.uniandes.csw.service.documenttype;

import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.inject.Inject;

import co.edu.uniandes.csw.documenttype.logic.api.IDocumentTypeLogicService;
import co.edu.uniandes.csw.documenttype.logic.dto.DocumentTypeDTO;


public abstract class _DocumentTypeService {

	@Inject
	protected IDocumentTypeLogicService documentTypeLogicService;
	
	@POST
	public DocumentTypeDTO createDocumentType(DocumentTypeDTO documentType){
		return documentTypeLogicService.createDocumentType(documentType);
	}
	
	@DELETE
	@Path("{id}")
	public void deleteDocumentType(@PathParam("id") Long id){
		documentTypeLogicService.deleteDocumentType(id);
	}
	
	@GET
	public List<DocumentTypeDTO> getDocumentTypes(){
		return documentTypeLogicService.getDocumentTypes();
	}
	
	@GET
	@Path("{id}")
	public DocumentTypeDTO getDocumentType(@PathParam("id") Long id){
		return documentTypeLogicService.getDocumentType(id);
	}
	
	@PUT
    @Path("{id}")
	public void updateDocumentType(@PathParam("id") Long id, DocumentTypeDTO documentType){
		documentTypeLogicService.updateDocumentType(documentType);
	}
	
}