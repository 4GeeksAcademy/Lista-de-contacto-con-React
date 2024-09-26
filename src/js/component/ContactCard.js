import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactCard = ({ contact }) => {
	const { actions } = useContext(Context);

	const handleDelete = () => {
		actions.deleteContact(contact.id);
	};

	return (
		<div className="card m-3">
			<img src="https://img.freepik.com/foto-gratis/cierrese-encima-retrato-cara-joven-hombre-barbudo_171337-2887.jpg" class="rounded-5 w-200 h-200 b/>
			<div className="card-body">
				<li>
				<h5 className="card-title">{contact.full_name}</h5>
				<p className="card-text">{contact.email}</p>
				<p className="card-text">{contact.phone}</p>
				<p className="card-text">{contact.address}</p>
				</li>

				<div className="card m-3 d-flex">

				<Link to={`/edit/${contact.id}`} className="btn btn-primary">Editar</Link>
				<button onClick={handleDelete} className="btn btn-danger ml-2">Eliminar</button>
				</div>
			</div>
		</div>
	);
};

export default ContactCard;
