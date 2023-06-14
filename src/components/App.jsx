import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export const App = () => {
  // state = {
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    // const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    setContacts([...contacts, newContact]);
  };

  const changeFilter = filter => {
    setFilter(filter);
  };

  const getFilteredContacts = () => {
    // const { contacts, filter } = this.state;
    const normalizedFilter = filter && filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    const contactsLs = window.localStorage.getItem('contacts');
    // const parsedContacts = JSON.parse(contactsLs);
    if (contactsLs) {
      setContacts(JSON.parse(contactsLs));
    }
  }, []);

  useEffect(() => {
    // if (this.state.contacts !== prevState.contacts) {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
    // }
  }, [contacts]);

  // const { filter } = this.state;
  const filteredContacts = filter ? getFilteredContacts() : contacts;
  return (
    <div className={css.container}>
      <h2>Phonebook</h2>
      <Form onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};
