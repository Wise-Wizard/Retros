import {
  ADMIN_USERS_REQUEST,
  ADMIN_USERS_SUCCESS,
  ADMIN_USERS_FAILURE,
  ADMIN_USERS_DELETE_REQUEST,
  ADMIN_USERS_DELETE_SUCCESS,
  ADMIN_USERS_DELETE_FAILURE,
} from "../Constants/adminConstants";

export const adminGetUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_USERS_REQUEST:
      return { loading: true };
    case ADMIN_USERS_SUCCESS:
      return { loading: false, usersList: action.payload };
    case ADMIN_USERS_FAILURE:
      return { loading: false, error: action.payload };

    case ADMIN_USERS_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_USERS_DELETE_SUCCESS:
      return { loading: false, usersList: action.payload };
    case ADMIN_USERS_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
