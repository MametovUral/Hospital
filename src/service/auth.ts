import api from "./api";

interface User {
  login: string;
  password: string;
  name?: string;

}

// AuthService interfeysi
interface AuthService {
  register(user: User): Promise<any>;
  login(user: User): Promise<any>;
  updateUser(user: User): Promise<any>;
  getUser(): Promise<any>;
}

const authService: AuthService = {
  async register(user: User) {
    const data = await api.post("/auth/reg", user);
    console.log(user);

    return data;
  },
  async login(user: User) {
    const data = await api.post("/auth/login", user);
    return data;
  },
  async updateUser(user: User) {
    const data = await api.put("/auth/update", user);
    return data;
  },
  async getUser() {
    const data = await api.get("/auth/find");
    return data;
  },
};

export default authService;
