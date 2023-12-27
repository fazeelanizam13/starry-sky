import React from 'react';
import StarrySky from './index';
export default {
  title: 'StarrySky',
};
export const Sky = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StarrySky
        size={{ width: 60, height: 70 }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontFamily:
                'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              color: 'white',
              fontWeight: 'lighter',
              lineHeight: '1.5rem',
            }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacinia vehicula
              rutrum. Cras ac bibendum odio. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Quisque id sem ipsum. Phasellus in finibus turpis, ac
              elementum lorem. Phasellus convallis nibh leo, sed dignissim ex ullamcorper ac.
              Maecenas consectetur nec lacus vel volutpat.
            </p>
            <p>
              Mauris pretium scelerisque dolor at egestas. Maecenas ornare consequat nisi at
              vestibulum. Donec in eleifend lacus, sit amet hendrerit nulla. Nulla a suscipit
              mauris. Vivamus tristique neque neque, ut aliquet elit molestie eu. Integer pretium
              eget mauris sit amet dictum. Cras ut tellus ligula. Proin sed semper neque. Sed
              lobortis, sem a feugiat condimentum, quam nisl gravida magna, ac tincidunt nulla lacus
              bibendum nunc.
            </p>
          </div>
        </div>
      </StarrySky>
    </div>
  );
};
