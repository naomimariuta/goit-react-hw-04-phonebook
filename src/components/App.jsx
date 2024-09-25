import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import storage from './service/storage';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const storedContacts = storage.load('contacts') || [];
      setContacts(storedContacts);
    } catch (error) {
      console.error('Error loading contacts from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      storage.save('contacts', contacts);
    } catch (error) {
      console.error('Error saving new contacts to localStorage:', error);
    }
  }, [contacts]);

  const handleAdd = (name, number) => {
    if (name.trim() !== '' && number.trim() !== '') {
      const newContact = {
        id: nanoid(),
        name: name.trim(),
        number: number.trim(),
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const handleDelete = contactId => {
    console.log('i am here in delete');
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>PhoneBook</h1>
      <ContactForm onAdd={handleAdd} contacts={contacts} />
      <h2>Contacts:</h2>
      <Filter filter={filter} onFilterChange={handleFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDelete}
        className={styles.list}
      />
    </div>
  );
};

export default App;
