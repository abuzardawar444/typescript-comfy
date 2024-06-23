import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useToast } from "./ui/use-toast";
import { clearCart } from "@/features/cart/cartSlice";
import { logoutUser } from "@/features/user/userSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const user = useAppSelector((state) => state.userState.user);

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logoutUser());
    toast({ description: "Logged out user..." });
    navigate("/");
  };

  return (
    <header>
      <div className='align-element flex justify-center sm:justify-end py-2'>
        {user ? (
          <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello {user.username}</p>
            <Button variant='link' size='sm' onClick={handleLogout}>
              logout
            </Button>
          </div>
        ) : (
          <div className='flex gap-x-6 justify-center items-center -mr-4'>
            <Button asChild variant='link' size='sm'>
              <Link to='/login'>Login / Guest</Link>
            </Button>
            <Button asChild variant='link' size='sm'>
              <Link to='/register'>register</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
