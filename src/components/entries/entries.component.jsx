import Entry from '../entry/entry.component';
import { Fragment } from 'react';
import ENTRIES_DATA from '../../entries-data.json';

import './entries.styles.scss';

const Entries = ({ categories }) => {
  return (
    <>
      <h2>azken albisteak</h2>
      {ENTRIES_DATA.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default Entries;
