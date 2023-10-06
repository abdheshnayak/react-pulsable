# React Pulsable

This is a simple react component that can be used to wrap other components and add a pulsing/skeleton effect to them.

[demo](https://k7fdzw.csb.app/)

## example

```jsx
import React, { useState } from 'react';
import Pulsable from 'react-pulsable';
// import styles from 'react-pulsable/index.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const formStyle = {
    backgroundColor: 'lightblue',
    padding: '20px',
    borderRadius: '5px',

    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'flex-start',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <Pulsable isLoading={isLoading}>
        <div>
          <h1>React Form with Pulsable</h1>
          <form style={formStyle}>
            <label htmlFor="name" className="pulsable">
              Name:
            </label>
            <div className="pulsable">
              <input type="text" id="name" style={{ width: '100%' }} />
            </div>

            <label htmlFor="email" className="pulsable">
              Email:
            </label>
            <div className="pulsable" disabled>
              <input type="email" id="email" style={{ width: '100%' }} />
            </div>

            <button
              className="pulsable"
              type="submit"
              style={{
                backgroundColor: 'blue',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </Pulsable>

      <button
        onClick={() => setIsLoading((s) => !s)}
        className="pulsable"
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isLoading ? 'Stop Loading' : 'Start Loading'}
      </button>
    </div>
  );
};

export default App;
```

