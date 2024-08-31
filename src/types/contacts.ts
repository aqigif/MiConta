type Address = {
	street: string;
	city: string;
	state: string;
	zip: string;
};

export type Contact = {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: Address;
};

export type Contacts = Contact[];
