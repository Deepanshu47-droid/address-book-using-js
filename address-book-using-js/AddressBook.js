// Class to define a Contact in the Address Book
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    // Method to display contact details
    display() {
        return `Name: ${this.firstName} ${this.lastName}, Address: ${this.address}, ${this.city}, ${this.state} - ${this.zip}, Phone: ${this.phoneNumber}, Email: ${this.email}`;
    }
}

// Example contact creation
let contact1 = new Contact(
    "Deepanshu",
    "Malviya",
    "456 Colony",
    "Bhopal",
    "MP",
    "462023",
    "9876543210",
    "deepanshu@example.com"
);

console.log(contact1.display());
