import React from 'react';
import { Navigate } from 'react-router-dom';
import CounterApp from '../Components/CounterApp';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';


function Population() {
  // Render the CounterApp component if user is authenticated
  return (
    <div>
      <CounterApp />
      <div id="Footer_Dash">
          <div>
          <Link to="https://www.linkedin.com/in/godswill-ogono-861802144/"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
          <Link to="https://www.twitter.com/"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
          <Link to="https://www.instagram.com/godswill_oj/"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
          <Link to="https://api.whatsapp.com/send?phone=2347036744231&text=Hello, more information!"><li><FontAwesomeIcon icon={faWhatsapp} /></li></Link>
          <Link to="https://wwww.facebook.com/"><li><FontAwesomeIcon icon={faFacebook} /></li></Link>
          </div>
      </div>
    </div>
  );
}

export default Population;
