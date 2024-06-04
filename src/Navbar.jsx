import {
    Disclosure,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import { useSelector, useDispatch } from "react-redux";
import {logout } from "./store/slice/authSlice";

const NavBar = ({ onToggleSignIn, showSignIn, onTogglePasslist, showPasslist }) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    

    const handleLogout = () => {
        dispatch(logout());
    };

    const handlehome=()=>{
        if (showSignIn===true){
            onToggleSignIn()
        } else if (showPasslist === true){
            onTogglePasslist()
        }
    }

    const handlepasswordlist=()=>{
        if(showPasslist===false){
            onTogglePasslist()
        }else{
            return
        }
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                                <div onClick={handlehome} className="flex flex-row items-center hover:cursor-pointer">
                                    <img
                                        className="h-8 w-auto mr-2"
                                        src="/public/vite.png"
                                        alt=""
                                    />
                                    <p className="m-0 text-gray-50">PassGen</p>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </MenuButton>
                                    </div>
                                    <Transition
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {!userInfo && (
                                                <>
                                                    <MenuItem onClick={onToggleSignIn}>
                                                        {({ focus }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign In
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                </>
                                            )}
                                            {userInfo && (
                                                <>
                                                    {showPasslist===false && (
                                                        <MenuItem onClick={handlepasswordlist}>
                                                            {({ focus }) => (
                                                                <a
                                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                                >
                                                                    Password List
                                                                </a>
                                                            )}
                                                        </MenuItem>
                                                    )}
                                                    <MenuItem onClick={handleLogout}>
                                                        {({ focus }) => (
                                                            <a
                                                                className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Sign out
                                                            </a>
                                                        )}
                                                    </MenuItem>
                                                </>
                                            )}
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default NavBar;