import React, { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import shortid from 'shortid';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount(){
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if(parsedContacts){
    this.setState({contacts: parsedContacts});}
  }
  
  componentDidUpdate(prevProps, prevState){
    if(this.state.contacts !== prevState){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = data => {
    const searchSameName = this.state.contacts.some(
      ({ name }) => name === data.name
    );

    if (searchSameName) {
      alert(`${data.name} is already in contacts`);
    } else {
      const contact = {
        ...data,
        id: shortid.generate(),
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getFilterContact = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };
  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };
  render() {
    const { filter } = this.state;

    const filterContact = this.getFilterContact();
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 20,
          color: '#010101',
          margin: 15,
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />
        <h3>Contacts</h3>
        <p>Find contacts by name</p>
        <Filter value={filter} onChange={this.changeFilter} />
        <ul>
          <ContactList
            contacts={filterContact}
            onDeleteContact={this.deleteContact}
          />
        </ul>
      </div>
    );
  }
}

export default App;
