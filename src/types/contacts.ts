type TAddress = {
	street: string;
	city: string;
	state: string;
	zip: string;
};

export type TContact = {
	id: string;
	name: string;
	phone: string;
};

export interface TContactDetail extends TContact {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: TAddress;
}

export type TContactList = TContact[];
