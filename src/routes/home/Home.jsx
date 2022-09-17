import { Outlet } from 'react-router-dom'; 
import Entries from '../../components/entries/entries.component';
import Footer from '../../components/footer/footer.component';

const Home = () => {
    const imageUrl = 'https://raw.githubusercontent.com/pxai/zabaldu-backend/master/zabaldu.png';
    const categories = [
        {
          id: 1,
          title: 'euskalherria',
          imageUrl,
        },
        {
          id: 2,
          title: 'espainia',
          imageUrl,
        },
        {
          id: 3,
          title: 'internazionala',
          imageUrl,
        },
        {
          id: 4,
          title: 'kultura',
          imageUrl,
        },
        {
          id: 5,
          title: 'teknologia',
          imageUrl,
        },
      ];

  return (
    <div id="contents">
       <Entries categories={categories} />
       <Outlet />
       <Footer />
    </div>
   
  )
};

export default Home;