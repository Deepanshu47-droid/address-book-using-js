// Class to define a Contact in the Address Book
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateMinLength(address, 4, "Address");
        this.city = this.validateMinLength(city, 4, "City");
        this.state = this.validateMinLength(state, 4, "State");
        this.zip = this.validateZip(zip);
        this.phoneNumber = this.validatePhone(phoneNumber);
        this.email = this.validateEmail(email);
    }

    validateName(name, fieldName) {
        let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${fieldName} is invalid. Must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    validateMinLength(value, minLength, fieldName) {
        if (value.length < minLength) {
            throw new Error(`${fieldName} must have at least ${minLength} characters.`);
        }
        return value;
    }

    validateZip(zip) {
        let zipRegex = /^[1-9][0-9]{5}$/;
        if (!zipRegex.test(zip)) {
            throw new Error(`Zip is invalid. Should be a 6-digit number starting with non-zero.`);
        }
        return zip;
    }

    validatePhone(phoneNumber) {
        let phoneRegex = /^[6-9][0-9]{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            throw new Error(`Phone number is invalid. Should be a valid 10-digit Indian number.`);
        }
        return phoneNumber;
    }

    validateEmail(email) {
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error(`Email is invalid.`);
        }
        return email;
    }

    display() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phoneNumber}, Email: ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    // addContact(contact) {
    //     this.contacts.push(contact);
    //     console.log("Contact added successfully!");
    // }

    addContact(contact) {
        // Duplicate check using filter on firstName and lastName
        let duplicate = this.contacts.filter(existingContact => 
            existingContact.firstName === contact.firstName &&
            existingContact.lastName === contact.lastName
        );
        
        if (duplicate.length > 0) {
            console.log("Duplicate contact found. Cannot add the contact.");
        } else {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    }
    

    findContact(firstName, lastName) {
        return this.contacts.find(
            contact =>
                contact.firstName.toLowerCase() === firstName.toLowerCase() &&
                contact.lastName.toLowerCase() === lastName.toLowerCase()
        );
    }

    editContact(firstName, lastName, updatedData) {
        let contact = this.findContact(firstName, lastName);
        if (contact) {
            try {
                if (updatedData.firstName) contact.firstName = contact.validateName(updatedData.firstName, "First Name");
                if (updatedData.lastName) contact.lastName = contact.validateName(updatedData.lastName, "Last Name");
                if (updatedData.address) contact.address = contact.validateMinLength(updatedData.address, 4, "Address");
                if (updatedData.city) contact.city = contact.validateMinLength(updatedData.city, 4, "City");
                if (updatedData.state) contact.state = contact.validateMinLength(updatedData.state, 4, "State");
                if (updatedData.zip) contact.zip = contact.validateZip(updatedData.zip);
                if (updatedData.phoneNumber) contact.phoneNumber = contact.validatePhone(updatedData.phoneNumber);
                if (updatedData.email) contact.email = contact.validateEmail(updatedData.email);

                console.log("Contact updated successfully!");
            } catch (error) {
                console.error("Update failed:", error.message);
            }
        } else {
            console.log("Contact not found.");
        }
    }

    displayAddressBook() {
        console.log("\n---- Address Book ----");
        if (this.contacts.length === 0) {
            console.log("No contacts to display.");
        } else {
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.display()}`);
            });
        }
    }
    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(
            contact => contact.firstName === firstName && contact.lastName === lastName
        );
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log("Contact deleted successfully!");
        } else {
            console.log("Contact not found.");
        }
    }
    countContacts() {
        console.log(`Total Contacts: ${this.contacts.length}`);
        return this.contacts.length;
    }
    // Search contacts by city
searchByCity(city) {
    let personsInCity = this.contacts.filter(contact => contact.city === city);
    if (personsInCity.length > 0) {
        console.log(`\nContacts in ${city}:`);
        personsInCity.forEach(contact => console.log(contact.display()));
    } else {
        console.log(`\nNo contacts found in ${city}.`);
    }
}

// Search contacts by state
searchByState(state) {
    let personsInState = this.contacts.filter(contact => contact.state === state);
    if (personsInState.length > 0) {
        console.log(`\nContacts in ${state}:`);
        personsInState.forEach(contact => console.log(contact.display()));
    } else {
        console.log(`\nNo contacts found in ${state}.`);
    }
    }
    // View persons grouped by city
viewPersonsByCity() {
    let cityMap = this.contacts.reduce((map, contact) => {
        if (!map[contact.city]) {
            map[contact.city] = [];
        }
        map[contact.city].push(`${contact.firstName} ${contact.lastName}`);
        return map;
    }, {});

    console.log("\nPersons by City:");
    for (let city in cityMap) {
        console.log(`${city}: ${cityMap[city].join(", ")}`);
    }
}

// View persons grouped by state
viewPersonsByState() {
    let stateMap = this.contacts.reduce((map, contact) => {
        if (!map[contact.state]) {
            map[contact.state] = [];
        }
        map[contact.state].push(`${contact.firstName} ${contact.lastName}`);
        return map;
    }, {});
    
    console.log("\nPersons by State:");
    for (let state in stateMap) {
        console.log(`${state}: ${stateMap[state].join(", ")}`);
    }
    }

}


let myAddressBook = new AddressBook();

try {
    let contact1 = new Contact(
        "Deepanshu",
        "Malviya",
        "456 Colony",
        "Bhopal",
        "MPState",
        "462023",
        "9876543210",
        "deepanshu@example.com"
    );
    myAddressBook.addContact(contact1);

    let contact2 = new Contact(
        "Shubham",
        "Verma",
        "123 Street",
        "Indore",
        "MPState",
        "452001",
        "9123456789",
        "shubham@example.com"
    );
    myAddressBook.addContact(contact2);

} catch (error) {
    console.error(error.message);
}

console.log("\n---- Before Update ----");
myAddressBook.displayAddressBook();

myAddressBook.editContact("Shubham", "Verma", {
    city: "Ujjain",
    phoneNumber: "9988776655"
});

console.log("\n---- After Update ----");
myAddressBook.displayAddressBook();

//UC - 5 : Delete Functionality
myAddressBook.deleteContact("Shubham", "Verma");

//UC - 6 : Count contacts
myAddressBook.countContacts();

//UC - 8 : search by city or state
myAddressBook.searchByCity("Bhopal");
myAddressBook.searchByState("MPState");

//UC - 9 : view person by city
myAddressBook.viewPersonsByCity();
myAddressBook.viewPersonsByState();

