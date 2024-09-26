import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const AddContact = () => {
	const { actions, store } = useContext(Context);
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		phone: "",
		address: ""
	});
	const history = useHistory();
	const { id } = useParams();

	// Si es edición, cargar el contacto existente
	useEffect(() => {
		if (id) {
			const existingContact = store.contacts.find(c => c.id == id);
			if (existingContact) setContact(existingContact);
		}
	}, [id, store.contacts]);

	const handleChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		actions.saveContact(contact, id);
		history.push("/");
	};

	return (
		<div className="container">
			<h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="full_name"
					placeholder="Nombre completo"
					value={contact.full_name}
					onChange={handleChange}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={contact.email}
					onChange={handleChange}
				/>
				<input
					type="phone"
					name="phone"
					placeholder="Teléfono"
					value={contact.phone}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="address"
					placeholder="Dirección"
					value={contact.address}
					onChange={handleChange}
				/>
				<button type="submit" className="btn btn-success">
					{id ? "Actualizar Contacto" : "Agregar Contacto"}
				</button>
			</form>
		</div>
	);
};

export default AddContact;
