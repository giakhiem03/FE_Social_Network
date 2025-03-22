const initialState = {
    id: 0,
    fullName: "",
    email: "",
    avatar: "",
    phoneNumber: "",
};

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default counterReducer;
