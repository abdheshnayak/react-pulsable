/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Pulsable from '../pulsable';
import '../css/index.scss';
import './ui.css';

const TestUI = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: '0 auto',
        maxWidth: '40rem',
        width: '100%',
        // alignItems: "flex-center"
      }}
    >
      <button
        onClick={() => setIsLoading((s) => !s)}
        className="pulsable"
        style={{
          backgroundColor: isLoading ? 'red' : 'green',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isLoading ? 'Stop Loading' : 'Start Loading'}
      </button>

      <Pulsable noRadius isLoading={isLoading}>
        <ProfileCard />
      </Pulsable>

      <Pulsable isLoading={isLoading} backgroundColor="orange">
        <FormComp />
      </Pulsable>

      <Pulsable isLoading={isLoading} backgroundColor="gray">
        <FormComp />
      </Pulsable>

      <Pulsable isLoading={isLoading} backgroundColor="skyblue">
        <FormComp />
      </Pulsable>
    </div>
  );
};

const FormComp = () => {
  return (
    <form>
      <label htmlFor="name" className="pulsable">
        Name:
      </label>
      <div className="pulsable">
        <input type="text" id="name" />
      </div>

      <label htmlFor="email" className="pulsable">
        Email:
      </label>
      <div className="pulsable">
        <input type="email" id="email" />
      </div>

      <button className="pulsable" type="submit">
        Submit
      </button>
    </form>
  );
};

const ProfileCard = () => {
  return (
    <div className="profile-card">
      <div className="profile-picture pulsable pulsable-circle pulsable-img">
        <img src="https://picsum.photos/200" alt="profile" />
      </div>
      <div className="details-container">
        <div className="profile-name pulsable">John Doe</div>
        <div className="profile-age pulsable">30 years old</div>
        <div className="profile-address pulsable">
          123 Main Street, Cityville
        </div>
        <div className="profile-contact pulsable">
          Email: john@example.com
          <br />
          Phone: (123) 456-7890
        </div>
      </div>
    </div>
  );
};

export default TestUI;
