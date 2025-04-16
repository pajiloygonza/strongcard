import React from 'react';
import './style.css';
import { Route, Routes } from 'react-router';
import Catalog from '../Catalog';
import Main from '../Main';
import BusinessComponent from '../BusinessComponent';
import AboutCard from '../AboutCard';
import { places } from '../../data';
export const RoutesComponent = () => {
    return (
      <div className="routes-main">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/" element={<Main />} />
          <Route path="/business" element={<BusinessComponent />} />
          <Route path="/about/:id" element={<AboutCard places={places} />} />
          {/* <Route path ="/sales" element={} /> */}
          {/* <Route path ="/contacts" element={} /> */}
          {/* <Route path ="/faq" element={} /> */}
        </Routes>
      </div>
    );
};
export default RoutesComponent;