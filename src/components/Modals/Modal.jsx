import React, {useState, useEffect} from 'react';
import * as houseService from '../../services/houseService';
import * as authService from '../../services/authServices';

import HouseForm from '../../pages/Forms/HouseForm';
import { Dialog, DialogContent } from '@material-ui/core';


export default function Modal(props) {
  const {title, children, openPopup, setOpenPopUp} = props
  
    return (

      <Dialog open={openPopup}>
          <DiallogTitle>
            <div>title goes here</div>
          </DiallogTitle>
          <DialogContent>
            <div>Content goes here.</div>
          </DialogContent>

      </Dialog>
    )
  
}
