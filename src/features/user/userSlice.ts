import { toast } from "@/components/ui/use-toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  username: string;
  jwt: string;
};

type UserState = {
  user: User | null;
};

const getUserFromLocalStorage = (): User | null => {
  const user = localStorage.getItem("user");
  if (!user) return null;
  return JSON.parse(user);
};

const initialState: UserState = {
  user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      console.log(user);
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      if (user.username === "demo user") {
        toast({ description: "Welcome demo user..." });
        return;
      }
      toast({ description: "Login successfull..." });
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
