
package co.edu.uniandes.csw.country.logic.mock;
import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.country.logic.dto.CountryDTO;
import co.edu.uniandes.csw.country.logic.api._ICountryLogicService;

public abstract class _CountryMockLogicService implements _ICountryLogicService {

	private static Long id= new Long(1);
	protected static List<CountryDTO> data=new ArrayList<CountryDTO>();

	public CountryDTO createCountry(CountryDTO country){
		id++;
		country.setId(id);
                data.add(country);
		return country;
    }

	public List<CountryDTO> getCountrys(){
		return data; 
	}

	public CountryDTO getCountry(Long id){
		for(CountryDTO data1:data){
			if(data1.getId().equals(id)){
				return data1;
			}
		}
		return null;
	}

	public void deleteCountry(Long id){
	    CountryDTO delete=null;
		for(CountryDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
		} 
	}

	public void updateCountry(CountryDTO country){
	    CountryDTO delete=null;
		for(CountryDTO data1:data){
			if(data1.getId().equals(id)){
				delete=data1;
			}
		}
		if(delete!=null){
			data.remove(delete);
			data.add(country);
		} 
	}	
}