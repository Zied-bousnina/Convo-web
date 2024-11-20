// components/ContactInfoForm/ContactInfoForm.js
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactInfoForm = ({ phone, setPhone, onChangeHandler }) => (
  <div>
    <div className="mb-3">
      <label className="form-label">Numéro de contact:</label>
      <PhoneInput
        country={'fr'}
        value={phone}
        onChange={setPhone}
        enableSearch
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Email du contact:</label>
      <input
        type="text"
        placeholder="Email du contact"
        name="mail"
        className="form-control"
        onChange={onChangeHandler}
        required
      />
    </div>
  </div>
);

export default ContactInfoForm;