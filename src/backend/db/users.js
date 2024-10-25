import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Satya",
    lastName: "Prakash",
    email: "sprakash9120@gmail.com",
    password: "satya123",
    userAddresses: [
      {
        id: uuid(),
        firstName: "Satya",
        lastName: "Prakash",
        addressLine1: "789 Oak St",
        addressLine2: "Suite 10",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India",
      },
    ],
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
