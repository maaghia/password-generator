import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { SetStateAction, useState } from 'react'
import passwordGif from '../../assets/gif/password.gif'
import { ReactComponent as Copy } from '../../assets/icons/copy.svg'
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg'
import Checkbox from '../Checkbox'
import './index.css'


const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [randomPassword, setRandomPassword] = useState('46QBKCVP');
  const [uppercaseChecked, setUppercaseChecked] = useState(true);
  const [lowercaseChecked, setLowercaseChecked] = useState(false);
  const [numbersChecked, setNumbersChecked] = useState(false);
  const [specialCharsChecked, setSpecialCharsChecked] = useState(true);

  console.log("first", uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked);
  if (!uppercaseChecked && !lowercaseChecked && !numbersChecked && !specialCharsChecked) {
    setLowercaseChecked(!lowercaseChecked);
  } 
  const handleRefresh = () => {
    const newPassword = generateRandomPassword(passwordLength);
    setRandomPassword(newPassword);
  };

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }
  
  const getRandomCharFromArray = (array: string | any[]) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  const generateRandomPassword = (length: number | number[]) => {
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+~`|}{[]\\:;?><,./-=';

    let allChar = '';
    if(uppercaseChecked) allChar += uppercaseLetters;
    if(lowercaseChecked) allChar += lowercaseLetters;
    if(numbersChecked) allChar += numbers;
    if(specialCharsChecked) allChar += specialCharacters;

    let switchIndex = '';

    if(lowercaseChecked) switchIndex += '0';
    if(uppercaseChecked) switchIndex += '1';
    if(numbersChecked) switchIndex += '2';
    if(specialCharsChecked) switchIndex += '3';
    
    console.log(switchIndex);

    let randomPassword = '';

    for (let i = 0; i < length; i++) {
      const randomChoice = getRandomCharFromArray(switchIndex); 
      

      console.log('----'+randomChoice)

      switch (randomChoice) {
        case '0':
          randomPassword += getRandomCharFromArray(lowercaseLetters);
          break;
        case '1':
          randomPassword += getRandomCharFromArray(uppercaseLetters);
          break;
        case '2':
          randomPassword += getRandomCharFromArray(numbers);
          break;
        case '3':
          randomPassword += getRandomCharFromArray(specialCharacters);
          break;
        default:
          break;
      }
    }

    return randomPassword;
  }

  // Event handlers for checkbox state updates
  const handleUppercaseChange = () => {
    setUppercaseChecked(!uppercaseChecked);
  };

  const handleLowercaseChange = () => {
    setLowercaseChecked(!lowercaseChecked);
    console.log(uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked);
  };

  const handleNumbersChange = () => {
    setNumbersChecked(!numbersChecked);
    console.log(uppercaseChecked, lowercaseChecked, numbersChecked, specialCharsChecked);
  };

  const handleSpecialCharsChange = () => {
    setSpecialCharsChecked(!specialCharsChecked);
  };

  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text" placeholder="your password" value={randomPassword} readOnly/>
          <button onClick={handleRefresh}>
          <Refresh />
          </button>
        </div>
        <button className="copy-btn">
          <Copy /> Copy
        </button>
      </div>
      <span className="fw-500">Weak</span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Uppercase" checked={uppercaseChecked} onChange={handleUppercaseChange} name="upper" />
        <Checkbox id="lowercase" label="Lowercase" checked={lowercaseChecked} onChange={handleLowercaseChange} name="lower" />
        <Checkbox id="numbers" label="Numbers" checked={numbersChecked} onChange={handleNumbersChange} name="numbers" />
        <Checkbox id="special chars" label="Special Characters" checked={specialCharsChecked} onChange={handleSpecialCharsChange} name="specialChars"/>
      </div>
    </div>
  )
}

export default PasswordGenerator
