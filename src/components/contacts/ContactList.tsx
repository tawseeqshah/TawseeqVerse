import React from 'react';
import { Contact } from '../../types';
import { Trash2, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
}

export function ContactList({ contacts, onDelete }: ContactListProps) {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-white p-4 rounded-lg shadow-sm space-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-900">{contact.name}</h3>
              {contact.business && (
                <p className="text-sm text-gray-600">{contact.business}</p>
              )}
              {contact.address && (
                <p className="text-sm text-gray-600">{contact.address}</p>
              )}
              {(contact.district || contact.reference) && (
                <p className="text-sm text-gray-600">
                  {contact.district}
                  {contact.district && contact.reference && ' • '}
                  {contact.reference}
                </p>
              )}
              <div className="flex items-center gap-4 mt-2">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Mail className="w-4 h-4 mr-1" />
                    {contact.email}
                  </a>
                )}
              </div>
            </div>
            <button
              onClick={() => onDelete(contact.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Added on {format(new Date(contact.created_at), 'MMM d, yyyy')}
          </p>
        </div>
      ))}
    </div>
  );
}