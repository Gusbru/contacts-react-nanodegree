import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static PropTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };

    state = {
        query: ''
    };

    updateQuery = (inputText) => {
        let trimmedQuery = inputText.replace(/^\s+/, '')
        this.setState({ 
            query: trimmedQuery 
        })
    };

    render() {
        //const contacts = this.props.contacts;
        let showingContacts;

        if (this.state.query) {
            const match = new RegExp(escapeRegExp(this.state.query), 'i' );
            showingContacts = this.props.contacts.filter((contact) => (
                match.test(contact.name) || match.test(contact.email)
            ));
        } else {
            showingContacts = this.props.contacts;
        }

        showingContacts.sort(sortBy('name'));

        return ( 
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link
                        to="/create"
                        className="add-contact">
                        Add Contact
                    </Link>
                </div> 
                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts