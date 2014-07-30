
package co.edu.uniandes.csw.address.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.address.logic.dto.AddressDTO;
import co.edu.uniandes.csw.address.logic.api._IAddressLogicService;

public abstract class _AddressMockLogicService implements _IAddressLogicService {

	private static Long id= new Long(1);
	protected static List<AddressDTO> data=new ArrayList<AddressDTO>();

	public AddressDTO createAddress(AddressDTO address){
		id++;
		address.setId(id);
                data.add(address);
		return address;
    }

	public List<AddressDTO> getAddresss(){
		return data; 
	}

	public AddressDTO getAddress(Long id){
		for(AddressDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteAddress(Long id){
	    AddressDTO delete=null;
		for(AddressDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateAddress(AddressDTO address){
	    AddressDTO delete=null;
		for(AddressDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(address);
		} 
	}	
}