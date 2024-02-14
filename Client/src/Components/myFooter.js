import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function MyFooter() {
    return(
        <div className="Footer">
            <div>
            <Link to="/linkedin"><li><FontAwesomeIcon icon={faLinkedin} /></li></Link>
            <Link to="/facebook"><li><FontAwesomeIcon icon={faTwitter} /></li></Link>
            <Link to="/instagram"><li><FontAwesomeIcon icon={faInstagram} /></li></Link>
            </div>
        </div>
    )
}

export default MyFooter;