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

    // Method to display contact details
    display() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phoneNumber}, Email: ${this.email}`;
    }
}
// Address Book array to store contacts
let addressBook = [];

// Function to add contact to address book
function addContact(contact) {
    addressBook.push(contact);
    console.log("Contact added successfully!");
}



// Example of adding contacts
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
    addContact(contact1);

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
    addContact(contact2);

} catch (error) {
    console.error(error.message);
}

// Display all contacts in address book
function displayAddressBook() {
    console.log("\n---- Address Book ----");
    addressBook.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.display()}`);
    });
}

displayAddressBook();