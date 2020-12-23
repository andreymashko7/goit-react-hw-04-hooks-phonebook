import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit, contacts }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const matchContact = () => {
    const namesInPhonebook = contacts.map(({ name }) => name);
    const numbersInPhonebook = contacts.map(({ number }) => number);

    if (
      namesInPhonebook.includes(name) ||
      numbersInPhonebook.includes(number)
    ) {
      alert(`${name}${number} is already in contacts!!!`);
      return true;
    }

    if (name === '' || number === '') {
      alert('Please enter all fields');
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');

    if (matchContact()) {
      return;
    }

    onSubmit(name, number);
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => {
            setName(e.currentTarget.value);
          }}
          placeholder="Rosie Simpson"
          className={s.input}
        ></input>
      </label>

      <label htmlFor="number" className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={e => {
            setNumber(e.currentTarget.value);
          }}
          placeholder="459-12-56"
          className={s.input}
        ></input>
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};
