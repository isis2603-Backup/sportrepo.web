package co.edu.uniandes.csw.user.master.logic.mock;

import co.edu.uniandes.csw.address.logic.api._IAddressLogicService;
import co.edu.uniandes.csw.address.logic.dto.AddressDTO;
import co.edu.uniandes.csw.address.persistence.api.IAddressPersistence;
import co.edu.uniandes.csw.sport.logic.api.ISportLogicService;
import co.edu.uniandes.csw.sport.logic.dto.SportDTO;
import co.edu.uniandes.csw.sport.persistence.api.ISportPersistence;
import co.edu.uniandes.csw.user.logic.api._IUserLogicService;
import co.edu.uniandes.csw.user.logic.dto.UserDTO;
import co.edu.uniandes.csw.user.master.logic.api._IUserMasterLogicService;
import co.edu.uniandes.csw.user.master.logic.dto.UserMasterDTO;

import co.edu.uniandes.csw.user.persistence.api.IUserPersistence;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;

public abstract class _UserMasterLogicService implements _IUserMasterLogicService {

  
    protected static ArrayList<UserMasterDTO> userMasterDtosList;
    @Inject
    protected _IAddressLogicService addressPersistance;
    @Inject
    protected ISportLogicService sportPersistance; 
   

    public UserMasterDTO createMasterUser(UserMasterDTO user) {
        
        List<AddressDTO> detailsAddress = user.getCreateAddress();
        for (AddressDTO addressDTO : detailsAddress) {
            addressPersistance.createAddress(addressDTO);
        }
        
        List<SportDTO> detailsSport = user.getCreateSport();
        for (SportDTO sportDTO : detailsSport) {
            sportPersistance.createSport(sportDTO);
        }
        
        /*UserDTO persistedUserDTO = userPersistance.createUser(user.getUserEntity());
        if (user.getCreateAddress() != null) {
            for (AddressDTO addressDTO : user.getCreateAddress()) {
                AddressDTO persistedAddressDTO = addressPersistance.createAddress(addressDTO);
                UserAddressEntity userAddressEntity = new UserAddressEntity(persistedUserDTO.getId(), persistedAddressDTO.getId());
                userMasterPersistance.createUserAddress(userAddressEntity);
            }
        }
        if (user.getCreateSport() != null) {
            for (SportDTO sportDTO : user.getCreateSport()) {
                SportDTO persistedSportDTO = sportPersistance.createSport(sportDTO);
                UserSportEntity userSportEntity = new UserSportEntity(persistedUserDTO.getId(), persistedSportDTO.getId());
                userMasterPersistance.createUserSport(userSportEntity);
            }
        }
        // update sport
        if (user.getUpdateSport() != null) {
            for (SportDTO sportDTO : user.getUpdateSport()) {
                sportPersistance.updateSport(sportDTO);
                UserSportEntity userSportEntity = new UserSportEntity(persistedUserDTO.getId(), sportDTO.getId());
                userMasterPersistance.createUserSport(userSportEntity);
            }
        }
        return user;*/
        return null;
    }

    public UserMasterDTO getMasterUser(Long id) {
        //return userMasterPersistance.getUser(id);
        return null;
    }

    public void deleteMasterUser(Long id) {
        //userPersistance.deleteUser(id);
    }

    public void updateMasterUser(UserMasterDTO user) {
       /* //userPersistance.updateUser(user.getUserEntity());

        //---- FOR RELATIONSHIP
        // persist new address
        if (user.getCreateAddress() != null) {
            for (AddressDTO addressDTO : user.getCreateAddress()) {
                AddressDTO persistedAddressDTO = addressPersistance.createAddress(addressDTO);
                UserAddressEntity userAddressEntity = new UserAddressEntity(user.getUserEntity().getId(), persistedAddressDTO.getId());
                userMasterPersistance.createUserAddress(userAddressEntity);
            }
        }
        // update address
        if (user.getUpdateAddress() != null) {
            for (AddressDTO addressDTO : user.getUpdateAddress()) {
                addressPersistance.updateAddress(addressDTO);
            }
        }
        // delete address
        if (user.getDeleteAddress() != null) {
            for (AddressDTO addressDTO : user.getDeleteAddress()) {
                userMasterPersistance.deleteUserAddress(user.getUserEntity().getId(), addressDTO.getId());
                addressPersistance.deleteAddress(addressDTO.getId());
            }
        }
        // delete sport
        if (user.getDeleteSport() != null) {
            for (SportDTO sportDTO : user.getDeleteSport()) {
                userMasterPersistance.deleteUserSport(user.getUserEntity().getId(), sportDTO.getId());
            }
        }
        // persist new sport
        if (user.getCreateSport() != null) {
            for (SportDTO sportDTO : user.getCreateSport()) {
                UserSportEntity userSportEntity = new UserSportEntity(user.getUserEntity().getId(), sportDTO.getId());
                userMasterPersistance.createUserSport(userSportEntity);
            }
        }
        // update sport
        if (user.getUpdateSport() != null) {
            for (SportDTO sportDTO : user.getUpdateSport()) {
                userMasterPersistance.deleteUserSport(user.getUserEntity().getId(), sportDTO.getId());
                sportPersistance.updateSport(sportDTO);
                UserSportEntity userSportEntity = new UserSportEntity(user.getId(), sportDTO.getId());
                userMasterPersistance.createUserSport(userSportEntity);
                
            }
        }*/
    }
}
