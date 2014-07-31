package co.edu.uniandes.csw.user.master.logic.mock;

import co.edu.uniandes.csw.address.logic.api._IAddressLogicService;
import co.edu.uniandes.csw.address.logic.dto.AddressDTO;

import co.edu.uniandes.csw.sport.logic.api.ISportLogicService;
import co.edu.uniandes.csw.sport.logic.dto.SportDTO;

import co.edu.uniandes.csw.user.logic.api.IUserLogicService;
import co.edu.uniandes.csw.user.master.logic.api._IUserMasterLogicService;
import co.edu.uniandes.csw.user.master.logic.dto.UserMasterDTO;

import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;

public abstract class _UserMasterLogicService implements _IUserMasterLogicService {

    protected static ArrayList<UserMasterDTO> userMasterDtosList = new ArrayList<UserMasterDTO>() ;
    @Inject
    protected _IAddressLogicService addressPersistance;
    @Inject
    protected ISportLogicService sportPersistance;
    @Inject
    protected IUserLogicService userPersistance;

    public UserMasterDTO createMasterUser(UserMasterDTO user) {

        userPersistance.createUser(user.getUserEntity());
        List<AddressDTO> detailsAddress = user.getCreateAddress();
        for (AddressDTO addressDTO : detailsAddress) {
            addressDTO = addressPersistance.createAddress(addressDTO);
        }

        List<SportDTO> detailsSport = user.getCreateSport();
        for (SportDTO sportDTO : detailsSport) {
            sportDTO = sportPersistance.createSport(sportDTO);
        }

        userMasterDtosList.add(user);
        return user;
    }

    public UserMasterDTO getMasterUser(Long id) {
        for (UserMasterDTO userMasterDTO : userMasterDtosList) {
            if (userMasterDTO.getUserEntity().getId() == id) {
                return userMasterDTO;
            }
        }

        return null;
    }

    public void deleteMasterUser(Long id) {
        for (UserMasterDTO userMasterDTO : userMasterDtosList) {
            if (userMasterDTO.getUserEntity().getId() == id) {

                List<AddressDTO> detailsAddress = userMasterDTO.getCreateAddress();
                for (AddressDTO addressDTO : detailsAddress) {
                    addressPersistance.deleteAddress(addressDTO.getId());
                }

                List<SportDTO> detailsSport = userMasterDTO.getCreateSport();
                for (SportDTO sportDTO : detailsSport) {
                    sportPersistance.deleteSport(sportDTO.getId());
                }
                userPersistance.deleteUser(userMasterDTO.getId());
                userMasterDtosList.remove(userMasterDTO);
            }
        }

    }

    public void updateMasterUser(UserMasterDTO user) {

         //userPersistance.updateUser(user.getUserEntity());
        //---- FOR RELATIONSHIP
        // persist new address
        if (user.getCreateAddress() != null) {
            for (AddressDTO addressDTO : user.getCreateAddress()) {
                AddressDTO persistedAddressDTO = addressPersistance.createAddress(addressDTO);
                addressDTO = persistedAddressDTO;
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

                addressPersistance.deleteAddress(addressDTO.getId());
            }
        }
        // delete sport
        if (user.getDeleteSport() != null) {
            for (SportDTO sportDTO : user.getDeleteSport()) {

                sportPersistance.deleteSport(sportDTO.getId());

            }
        }
        // persist new sport
        if (user.getCreateSport() != null) {
            for (SportDTO sportDTO : user.getCreateSport()) {

                sportPersistance.deleteSport(sportDTO.getId());
            }
        }
        // update sport
        if (user.getUpdateSport() != null) {
            for (SportDTO sportDTO : user.getUpdateSport()) {
                sportPersistance.updateSport(sportDTO);
            }
        }
    }
}
