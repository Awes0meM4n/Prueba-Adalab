import React from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../auth/withAuthorization';

import { ListadoCandidatas } from './ListadoCandidatas';

const HomeCandidatas = ({ authUser }) => {

  return (
    <div className="container">
      <ListadoCandidatas></ListadoCandidatas>

      <p>Hi {authUser.email}!</p>
    </div>
  );
};

HomeCandidatas.propTypes = {
  authUser: PropTypes.object.isRequired,
};

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomeCandidatas);
