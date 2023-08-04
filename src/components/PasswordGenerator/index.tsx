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

  /* const handlePasswordChange = (event: { target: { value: SetStateAction<string> } }) => {
    setRandomPassword(event.target.value);
  }; */
  
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

    let randomPassword = '';

    for (let i = 0; i < length; i++) {
      const randomChoice = Math.floor(Math.random() * 4); 

      switch (randomChoice) {
        case 0:
          randomPassword += getRandomCharFromArray(lowercaseLetters);
          break;
        case 1:
          randomPassword += getRandomCharFromArray(uppercaseLetters);
          break;
        case 2:
          randomPassword += getRandomCharFromArray(numbers);
          break;
        case 3:
          randomPassword += getRandomCharFromArray(specialCharacters);
          break;
        default:
          break;
      }
    }

    return randomPassword;
  }

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
        <Checkbox id="uppercase" label="Uppercase" checked={true} name="upper" />
        <Checkbox id="lowercase" label="Lowercase" checked={false} name="lower" />
        <Checkbox id="numbers" label="Numbers" checked={false} name="numbers" />
        <Checkbox
          id="special chars"
          label="Special Characters"
          checked={true}
          name="specialChars"
        />
      </div>
    </div>
  )
}

export default PasswordGenerator
