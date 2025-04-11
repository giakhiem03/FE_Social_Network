const initialState = {
    id: 0,
    fullName: "",
    username: "",
    email: "",
    gender: "",
    bio: "",
    avatar: "",
    role: "",
    access_token: "",
    phoneNumber: "",
    countFriend: 0,
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
