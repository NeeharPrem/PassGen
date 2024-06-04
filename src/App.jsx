import React, { useEffect, useState } from 'react';
import usePasswordGenerator from './hooks/use-password-generator';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Navbar';
import Form from './Form';
import Passlist from './passlist';
import { savepass } from './api/api';
import { useSelector } from 'react-redux';

function App() {
  const { password, generateError, generatePassword } = usePasswordGenerator();
  const [length, setLength] = useState(7);
  const [includeNumbers, setIncludeNumbers] = useState({ title: 'number', state: true });
  const [includeUppercase, setIncludeUppercase] = useState({ title: 'uppercase', state: true });
  const [includeLowercase, setIncludeLowercase] = useState({ title: 'lowercase', state: true });
  const [includeSymbols, setIncludeSymbols] = useState({ title: 'symbols', state: true });
  const [strength, setStrength] = useState(0);
  const [strengthColor, setStrengthColor] = useState('bg-gray-300');
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPasslist,setShowpasslist]=useState(false)
  const [savedName, setSavedName] = useState('');

  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId = userInfo ? userInfo.userInfo : null;

  const handleCheckboxChange = (type) => (e) => {
    const checked = e.target.checked;
    switch (type) {
      case 'numbers':
        setIncludeNumbers((prev) => ({ ...prev, state: checked }));
        break;
      case 'uppercase':
        setIncludeUppercase((prev) => ({ ...prev, state: checked }));
        break;
      case 'lowercase':
        setIncludeLowercase((prev) => ({ ...prev, state: checked }));
        break;
      case 'symbols':
        setIncludeSymbols((prev) => ({ ...prev, state: checked }));
        break;
      default:
        break;
    }
  };

  const calculateStrength = (password) => {
    let strength = 0;
    const lengthCriteria = password.length >= 8;
    const numberCriteria = /\d/.test(password);
    const upperCriteria = /[A-Z]/.test(password);
    const lowerCriteria = /[a-z]/.test(password);
    const symbolCriteria = /[!@#$%&()*^]/.test(password);

    if (lengthCriteria) strength += 20;
    if (numberCriteria) strength += 20;
    if (upperCriteria) strength += 20;
    if (lowerCriteria) strength += 20;
    if (symbolCriteria) strength += 20;

    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength < 40) {
      return 'bg-red-500';
    } else if (strength < 80) {
      return 'bg-yellow-500';
    } else {
      return 'bg-green-500';
    }
  };

  useEffect(() => {
    if (password) {
      const newStrength = calculateStrength(password);
      setStrength(newStrength);
      setStrengthColor(getStrengthColor(newStrength));
    }
  }, [password]);

  useEffect(() => {
    if (generateError) {
      toast.error(generateError);
    }
  }, [generateError]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyButtonText('Copied');
    setTimeout(() => {
      setCopyButtonText('Copy');
    }, 2000);
  };

  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const togglepasslist = () => {
    setShowpasslist(!showPasslist);
  };

  const handleSavepass = async(name, password) => {
    if(!name||name==""){
      toast.error('Name required')
      return
    }
    const userData = { name, password, userId }
    try {
      const data= await savepass(userData)
      if(data.state=true){
        setSavedName('');
        toast.success("Password name saved successfully!");
      }
    } catch (error) {
      
    }
  };

  
  return (
    <>
      <NavBar onToggleSignIn={toggleSignIn} showSignIn={showSignIn} onTogglePasslist={togglepasslist} showPasslist={showPasslist}/>
      {showSignIn ? (
        <Form onToggleSignIn={toggleSignIn} showSignIn={showSignIn} />
      ) : showPasslist ? (
        <Passlist />
      ) : (
      <div className = "bg-slate-900 lg:p-64 h-screen flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center lg:px-20">
        <div className="w-full mx-auto p-5 border border-gray-300 bg-gray-100">
          <h2 className="font-semibold text-lg mb-5">Password Generator</h2>
          {password && (
                    <div className='flex flex-col'>
                      <div className="flex justify-between items-center mb-5">
                        <input
                          type="text"
                          readOnly
                          value={password}
                          className="w-5/6 p-1 border border-gray-300 rounded-md"
                        />
                        <div>
                          <button
                            onClick={handleCopy}
                            className="p-1 bg-blue-600 w-36 text-white ml-2"
                          >
                            {copyButtonText}
                          </button>
                        </div>
                      </div>
                      {userId && (
                        <div className="flex justify-between items-center mb-5">
                          <input
                            type="text"
                            id='passname'
                            name='passname'
                            required
                            value={savedName}
                            onChange={(e) => setSavedName(e.target.value)}
                            className="w-5/6 p-1 border border-gray-300 rounded-md"
                          />
                          <div>
                            <button
                              onClick={() => handleSavepass(savedName, password)}
                              className="p-1 bg-blue-600 w-36 text-white ml-2"
                            >
                              Save password
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
          )}
          <div className="mb-4">
            <label className="flex justify-between items-center">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="4"
              max="20"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={includeNumbers.state}
                onChange={handleCheckboxChange('numbers')}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Uppercase Letters</span>
              <input
                type="checkbox"
                checked={includeUppercase.state}
                onChange={handleCheckboxChange('uppercase')}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Lowercase Letters</span>
              <input
                type="checkbox"
                checked={includeLowercase.state}
                onChange={handleCheckboxChange('lowercase')}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="flex justify-between items-center">
              <span>Symbols</span>
              <input
                type="checkbox"
                checked={includeSymbols.state}
                onChange={handleCheckboxChange('symbols')}
                className="ml-2"
              />
            </label>
          </div>
          <div className="mt-5">
            <label className="block mb-2">Password Strength</label>
            <div className="w-full h-1 bg-gray-300 rounded">
              <div
                className={`h-full ${strengthColor}`}
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-blue-500 w-full text-white py-2 rounded-md"
              onClick={() => generatePassword(includeNumbers, includeUppercase, includeLowercase, includeSymbols, length)}
            >
              Generate Password
            </button>
          </div>
        </div>
      </div>
    </div >
      )}
    </>
  );
}

export default App;