import { useEffect,useState} from "react";
import {getpasslist,deletepass} from "./api/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function Passlist() {
    const [passwordlist,setPasswordlist]=useState([])
    const userInfo = useSelector((state)=>state.auth.userInfo)
    const userId = userInfo ? userInfo.userInfo : null;

    useEffect(() => {
        const fetchData = async () => {
            const userData = { userId };
            try {
                const data = await getpasslist(userData);
                if (data.state === true) {
                    if (data.savedPasswords.length > 0) {
                        setPasswordlist([...data.savedPasswords]);
                    } else {
                        toast.error('No saved passwords');
                    }
                }
            } catch (error) {
                toast.error('Error while fetching passwords');
                console.error('Error fetching passwords:', error);
            }
        };

        fetchData();
    }, [userId]);

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password)
            .then(() => toast.success('Password copied to clipboard'))
            .catch(() => toast.error('Failed to copy password'));
    };

    const deletepassword = async (index) => {
        const userData = { userId, index };
        try {
            const data = await deletepass(userData);
            if (data.state === true) {
                toast.success(data.message);
                const updatedList = [...passwordlist];
                updatedList.splice(index, 1);
                setPasswordlist(updatedList);
            }
        } catch (error) {
            toast.error('Error while deleting password');
        }
    };
    return (
        <>
            <div className="bg-slate-900 lg:p-64 h-screen flex flex-col justify-center items-center">
                <div className="w-full h-full flex items-center justify-center lg:px-20">
                    {passwordlist.length > 0 ? (
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-2 px-4 border-b text-left">Name</th>
                                    <th className="py-2 px-4 border-b text-left">Password</th>
                                    <th className="py-2 px-4 border-b text-left">Copy</th>
                                    <th className="py-2 px-4 boarder-b text-left">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordlist.map((passwordItem, index) => (
                                    <tr key={index} className="even:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{passwordItem.name}</td>
                                        <td className="py-2 px-4 border-b">{passwordItem.password}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className="bg-blue-500 text-white py-1 px-3 rounded"
                                                onClick={() => copyToClipboard(passwordItem.password)}
                                            >
                                                Copy
                                            </button>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                className="bg-red-500 text-white py-1 px-3 rounded"
                                                onClick={() => deletepassword(index)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-white">No saved passwords</p>
                    )}
                </div>
            </div>
        </>
    )
}