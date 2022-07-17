import Albistea from '../albistea/albistea.component';
import { Fragment } from 'react';

import './albisteak.styles.scss';

const Albisteak = ({ categories }) => {
  return (
    <>
      <h2>azken albisteak</h2>
      {categories.map((category) => (
        <Albistea key={category.id} category={category} />
      ))}
    </>
  );
};

export default Albisteak;
