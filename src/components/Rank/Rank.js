import React from 'react';

const Rank = (props) => {
  return (
    <div>
      <div className='white f3'>
      {`${props.activeUser}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {props.userEntries}
      </div>
    </div>
  );
}

export default Rank;