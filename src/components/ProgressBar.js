import React from "react";

const ProgressBar = ({completed}) => {
  const containerStyles = {
    height: 23,
    width: '90%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 5
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    background: '#BE93C5', /* fallback for old browsers */
    background: '-webkit-linear-gradient(to right, #7BC6CC, #BE93C5)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to right, #7BC6CC, #BE93C5)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    borderRadius: 'inherit',
    transition: 'width 1s ease-in-out',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
    
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;