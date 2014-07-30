package co.edu.uniandes.csw.user.logic.mock;

import java.util.ArrayList;
import java.util.List;

import co.edu.uniandes.csw.user.logic.dto.UserDTO;
import co.edu.uniandes.csw.user.logic.api._IUserLogicService;

public abstract class _UserMockLogicService implements _IUserLogicService {

    private static Long id = new Long(1);
    protected static List<UserDTO> data = new ArrayList<UserDTO>();

    public UserDTO createUser(UserDTO user) {
        id++;
        user.setId(id);
        data.add(user);
        return user;
    }

    public List<UserDTO> getUsers() {
        return data;
    }

    public UserDTO getUser(Long id) {
        for (UserDTO data1 : data) {
            if (data1.getId().equals(id)) {
                return data1;
            }
        }
        return null;
    }

    public void deleteUser(Long id) {
        UserDTO delete = null;
        for (UserDTO data1 : data) {
            if (data1.getId().equals(id)) {
                delete = data1;
            }
        }
        if (delete != null) {
            data.remove(delete);
        }
    }

    public void updateUser(UserDTO user) {
        UserDTO delete = null;
        for (UserDTO data1 : data) {
            if (data1.getId().equals(id)) {
                delete = data1;
            }
        }
        if (delete != null) {
            data.remove(delete);
            data.add(user);
        }
    }
}
