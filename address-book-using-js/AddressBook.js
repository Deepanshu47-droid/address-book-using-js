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

    addContact(contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
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
