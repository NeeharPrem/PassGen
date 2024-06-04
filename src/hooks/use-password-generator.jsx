import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [generateError,setgenerateError]=useState('')

    const generatePassword = (includeNumbers,includeLowercase, includeUppercase, includeSymbols, length) => {
        let charset = '';
        const checkboxData = [
            { title: 'number', state: includeNumbers.state },
            { title: 'uppercase', state: includeUppercase.state },
            { title: 'symbols', state: includeSymbols.state },
            { title: 'lowercase', state: includeLowercase.state }
        ];

        const selectedOption = checkboxData.filter((checkData) => checkData.state);
        console.log(selectedOption)
        if(selectedOption.length===0){
            console.log('here')
            setgenerateError('Please select any option')
            setPassword('')
            return
        }

        const charsetLookup = {
            number: '0123456789',
            symbols: '!@#$%&()*^',
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz'
        };

        selectedOption.forEach((option) => {
            charset += charsetLookup[option.title] || '';
        });

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            generatedPassword += charset[randomIndex];
        }

        setPassword(generatedPassword);
        setgenerateError('')
    };
   
    return { password, generateError, generatePassword };
};

export default usePasswordGenerator;