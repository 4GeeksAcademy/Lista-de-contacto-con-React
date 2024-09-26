const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [], // Aquí se almacenarán los contactos
		},
		actions: {
			// Cargar los contactos desde la API
			loadContacts: async () => {
				try {
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/');
					if (!response.ok) throw new Error("Error al cargar los contactos");
					const data = await response.json();
					setStore({ contacts: data });
				} catch (error) {
					console.error(error);
				}
			},

			// Crear o actualizar un contacto
			saveContact: async (contact, id = null) => {
				const store = getStore();
				const method = id ? 'PUT' : 'POST';
				const url = id
					? `https://playground.4geeks.com/apis/fake/contact/${id}`
					: 'https://playground.4geeks.com/apis/fake/contact/';
				
				try {
					const response = await fetch(url, {
						method: method,
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(contact),
					});
					
					if (!response.ok) throw new Error(`Error al ${id ? 'actualizar' : 'crear'} el contacto`);
					await response.json();
					
					// Recargar la lista de contactos después de crear o actualizar
					getActions().loadContacts();
				} catch (error) {
					console.error(error);
				}
			},

			// Eliminar un contacto
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'DELETE',
					});
					if (!response.ok) throw new Error("Error al eliminar el contacto");
					
					// Recargar la lista de contactos después de eliminar
					getActions().loadContacts();
				} catch (error) {
					console.error(error);
				}
			},
		}
	};
};

export default getState;
