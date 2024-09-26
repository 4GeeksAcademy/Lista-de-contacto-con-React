import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

const Contacts = () => {
	const { store, actions } = useContext(Context);

	// Cargar los contactos cuando se monta el componente
	useEffect(() => {
		actions.loadContacts();
	}, []);

	return (
		<div className="container">
			<h2>Lista de Contactos</h2>
			<div className="row">
				{store.contacts.map((contact) => (
					<ContactCard key={contact.id} contact={contact} />
				))}
			</div>
		</div>
	);
};

export default Contacts;

