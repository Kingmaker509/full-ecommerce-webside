import React from 'react';

const OrderTable = ({ val, od, bmw }) => {

  return (

    <tbody>
      <td>
        {val.orderItems.map((item) => (
          < img key={item._id} src={item.image} className='orderimage obj-fit' alt='product' />
        ))}
      </td>
      <td>
        {val.orderItems.map((item) => (
          <p>{item._id}</p>
        ))}
      </td>
      <td>
        {val.orderItems.map((item) => (
          <p>{item.name}</p>
        ))}
      </td>
      <td>
        <p>{bmw}</p>
      </td>
      <td>
        <p>{od}</p>
      </td>
    </tbody>
  );
};

export default OrderTable;
