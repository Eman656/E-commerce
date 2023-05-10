class Person {
  constructor(id, first_name, last_name, email, phone, address, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.password = password;
  }
}

class User extends Person {
  constructor(id, first_name, last_name, email, phone, address, password) {
    super(id, first_name, last_name, email, phone, address, password);
    this.type = 0; // 0 for user, 1 for admin
  }
}

class Admin extends Person {
  constructor(id, first_name, last_name, email, phone, address, password) {
    super(id, first_name, last_name, email, phone, address, password);
    this.type = 1; // 0 for user, 1 for admin
  }
}