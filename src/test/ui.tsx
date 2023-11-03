/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import Pulsable from '../pulsable';
import './ui.css';

const App = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {/* default background */}
      <Pulsable isLoading={isLoading}>
        <YourComponent2 />
      </Pulsable>

      {/* custom background */}
      <Pulsable
        isLoading={isLoading}
        bgColors={{
          light: 'rgba(0, 128, 0, 0.2)',
          medium: 'rgba(0, 128, 0, 0.3)',
        }}
      >
        <YourComponent />
      </Pulsable>

      {/* custom background with no rounded corners */}
      <Pulsable
        noRadius
        isLoading={isLoading}
        bgColors={{
          light: 'rgba(0, 0, 255, 0.2)',
          medium: 'rgba(0, 0, 255, 0.3)',
        }}
      >
        <YourComponent />
      </Pulsable>

      {/* custom background with no padding in each skeleton items */}
      <Pulsable
        noPadding
        isLoading={isLoading}
        bgColors={{
          light: 'tomato',
          medium: 'orange',
        }}
      >
        <YourComponent />
      </Pulsable>
    </>
  );
};

const TestUI = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="main">
      <button
        onClick={() => setIsLoading((s) => !s)}
        className="loading-button"
      >
        <div>
          <input onChange={() => {}} type="checkbox" checked={isLoading} />
          Loading
        </div>
      </button>

      <Pulsable animation="wave-reverse" noRadius isLoading={isLoading}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <img
            style={{
              width: '200px',
              height: '200px',
            }}
            src="/logo.png"
            alt="logo"
          />
          <p className="pulsable pulsable-para leading-relaxed tracking-wide">
            voluptatum, Quisquam quae voluptatum, Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam quae voluptatum, voluptatum,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Quisquam quae voluptatum, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam quae voluptatum, Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam quae voluptatum,
            Quisquam quae voluptatum, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quisquam quae voluptatum,
          </p>
        </div>
      </Pulsable>

      <App isLoading={isLoading} />
    </div>
  );
};

const YourComponent = () => {
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

const YourComponent2 = () => {
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
