import mockRouter from 'next-router-mock';
jest.mock('next/router', () => require('next-router-mock'));

 jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

console.log("IMPORT ALL")