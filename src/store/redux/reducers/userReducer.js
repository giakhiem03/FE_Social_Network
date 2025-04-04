const initialState = {
    id: 0,
    fullName: "",
    username: "",
    email: "",
    gender: "",
    bio: "",
    avatar: "",
    phoneNumber: "",
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default counterReducer;
