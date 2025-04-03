import { useEffect, useRef, useState } from 'react';
import { ICustomer, ICustomerCreate } from '../../models/customers/ICustomer';
import CustomerForm from '../forms/CustomerForm';
import { useCustomers } from '../../hooks/useCustomers'; 
import Modal from '../shared/Modal';
import '../../styles/pages/admin.scss';
import { CirclePlus, Ellipsis } from 'lucide-react';

const CustomerManagement = () => {
    const { customers, error, addCustomer, editCustomer, removeCustomer } = useCustomers();
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [visibleActionsId, setVisibleActionsId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const actionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
    
            if (
                actionRef.current &&
                !actionRef.current.contains(target) &&
                !(target instanceof HTMLElement && target.closest('.action-buttons'))
            ) {
                setVisibleActionsId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    

    const handleSubmit = async (formData: ICustomerCreate) => {
        if (isEditing && selectedCustomer) {
            await editCustomer(selectedCustomer.id, formData);
            alert('Customer updated successfully');
        } else {
            await addCustomer(formData);
            alert('Customer added successfully');
        }
        resetSelection();
        closeModal(); // Close modal after submit
    };

    const handleEdit = (customer: ICustomer) => {
        setSelectedCustomer(customer);
        setIsEditing(true);
        openModal(); // Open modal when editing a customer
    };

    const handleDelete = async (id: number) => {
        await removeCustomer(id);
        alert('Customer deleted successfully');
    };

    const handleActionsToggle = (id: number) => {
        setVisibleActionsId(visibleActionsId === id ? null : id); // Toggle visibility of action buttons
    };

    const closeActions = () => {
        setVisibleActionsId(null); // Close actions dropdown
    };

    const resetSelection = () => {
        setIsEditing(false);
        setSelectedCustomer(null);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddCustomer = () => {
        resetSelection();
        openModal();
    };


    return (
        <div className='admin-section'>

            {error && <div>{error}</div>} {/* Show error message if any */}

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CustomerForm 
                    onSubmit={handleSubmit}
                    initialData={isEditing && selectedCustomer ? { 
                        firstname: selectedCustomer.firstname, 
                        lastname: selectedCustomer.lastname, 
                        email: selectedCustomer.email, 
                        password: selectedCustomer.password, 
                        phone: selectedCustomer.phone, 
                        street_address: selectedCustomer.street_address, 
                        postal_code: selectedCustomer.postal_code, 
                        city: selectedCustomer.city, 
                        country: selectedCustomer.country 
                    } : undefined}
                    isEditing={isEditing} 
                />
             </Modal>

                <section className='list-section'>
                <h2 className='admin-heading'>Kund administration</h2>
                    <div className='list-heading'>
                        <p>Kund ID</p>
                        <p>Namn</p>
                        <p>Epost</p>
                        <p>Tel</p>
                        <p>Adress</p>
                        <div className='button-container'>
                            <button className='add-button' onClick={handleAddCustomer}><CirclePlus size={16} /></button>
                        </div>
                    </div>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>
                            <div className='row'>
                                <p>{customer.id}</p>
                                <p>{customer.firstname} {customer.lastname}</p>
                                <p>{customer.email}</p>
                                <p>{customer.phone}</p>
                                <p>{customer.street_address}, {customer.postal_code}, {customer.city}, {customer.country}</p>
                                
                                <div className='actions' ref={actionRef}>
                                    <span className='three-dots' 
                                    onClick={() => handleActionsToggle(customer.id)}>
                                     <Ellipsis size="16px" />
                                    </span>
                                    {visibleActionsId === customer.id && (
                                  <div className='action-buttons'>
                                      <button 
                                          className='top-action-button action-button'
                                          onClick={(event) => { 
                                              event.stopPropagation();
                                              handleEdit(customer); // Opens edit modal
                                          }} 
                                      >
                                          Edit
                                      </button>
                                      <button 
                                          className='bottom-action-button action-button'
                                          onClick={(event) => {
                                              event.stopPropagation();
                                              handleDelete(customer.id!); // Deletes the product
                                              closeActions(); // Close actions dropdown
                                          }}
                                      >
                                          
                                          Delete
                                      </button>
                                  </div>
                              )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default CustomerManagement;