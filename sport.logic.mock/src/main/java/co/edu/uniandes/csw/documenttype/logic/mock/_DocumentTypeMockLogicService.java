
package co.edu.uniandes.csw.documenttype.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.documenttype.logic.dto.DocumentTypeDTO;
import co.edu.uniandes.csw.documenttype.logic.api._IDocumentTypeLogicService;

public abstract class _DocumentTypeMockLogicService implements _IDocumentTypeLogicService {

	private static Long id= new Long(1);
	protected static List<DocumentTypeDTO> data=new ArrayList<DocumentTypeDTO>();

	public DocumentTypeDTO createDocumentType(DocumentTypeDTO documentType){
		id++;
		documentType.setId(id);
                data.add(documentType);
		return documentType;
    }

	public List<DocumentTypeDTO> getDocumentTypes(){
		return data; 
	}

	public DocumentTypeDTO getDocumentType(Long id){
		for(DocumentTypeDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteDocumentType(Long id){
	    DocumentTypeDTO delete=null;
		for(DocumentTypeDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateDocumentType(DocumentTypeDTO documentType){
	    DocumentTypeDTO delete=null;
		for(DocumentTypeDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(documentType);
		} 
	}	
}