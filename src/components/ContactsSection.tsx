import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { Contact } from '../types';
import { ContactForm } from './contacts/ContactForm';
import { ContactList } from './contacts/ContactList';
import { ContactSearch } from './contacts/ContactSearch';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

export function ContactsSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to fetch contacts');
      return;
    }

    setContacts(data || []);
  };

  const handleAddContact = async (
    contact: Omit<Contact, 'id' | 'created_at' | 'user_id'>
  ) => {
    const { error } = await supabase.from('contacts').insert([contact]);

    if (error) {
      toast.error('Failed to add contact');
      return;
    }

    toast.success('Contact added successfully');
    fetchContacts();
  };

  const handleDeleteContact = async (id: string) => {
    const { error } = await supabase.from('contacts').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete contact');
      return;
    }

    toast.success('Contact deleted successfully');
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.business?.toLowerCase().includes(searchLower) ||
      contact.address?.toLowerCase().includes(searchLower) ||
      contact.district?.toLowerCase().includes(searchLower) ||
      contact.reference?.toLowerCase().includes(searchLower) ||
      contact.phone?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Contact</h2>
          <ContactForm onSubmit={handleAddContact} />
        </div>
        <div>
          <div className="mb-4">
            <ContactSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
          <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
        </div>
      </div>
    </div>
  );
}