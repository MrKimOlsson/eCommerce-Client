import React, { useState, useEffect } from 'react';
import { ICustomer } from '../../models/customers/ICustomer';
import '../../styles/forms/form.scss'

interface CustomerFormProps {
    onSubmit: (customer: Omit<ICustomer, 'id'>) => void;
    initialData?: Omit<ICustomer, 'id'>;
    isEditing: boolean;
}


const CustomerForm = (props: CustomerFormProps) => {
    const { onSubmit, initialData, isEditing } = props;

    const [formData, setFormData] = useState<Omit<ICustomer, 'id'>>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        street_address: '',
        postal_code: '',
        city: '',
        country: '',
    });

    // Load initial data when editing
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // Call the onSubmit function with the form data
        setFormData({ // Reset the form after submitting
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            phone: '',
            street_address: '',
            postal_code: '',
            city: '',
            country: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Uppdatera kund' : 'Lägg till kund'}</h2>
            <div className='row'>

                <div className='column'>
                    <input
                        type="text"
                        placeholder="Förnamn"
                        value={formData.firstname}
                        onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Efternamn"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Epost"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Lösenord"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />

                </div>
                <div className='column'>
                    <input
                        type="text"
                        placeholder="Adress"
                        value={formData.street_address}
                        onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Postnummer"
                        value={formData.postal_code}
                        onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Stad"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Land"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                    />
                    <button className="form-button" type="submit">{isEditing ? 'Uppdatera' : 'Lägg till'}</button>

                </div>
            </div>
        </form>
    );
};

export default CustomerForm;