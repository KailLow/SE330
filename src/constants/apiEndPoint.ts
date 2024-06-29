const BASE_API = "http://localhost:8081";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/authenticate`,
        customers: `${BASE_API}/customer`,
        supplier: `${BASE_API}/supplier`,
        category: `${BASE_API}/category`,
        product: `${BASE_API}/product`,
    },
    staff: {
        getStaffProfile: `${BASE_API}/staff/profile`,
    },
};

export default API;