export interface Profile {
  id: number;
  username: string;
  avatarUrl: string | null;
  subscribersAmount: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}

// export class Profile {
//   id: number;
//   username: string;
//   avatarUrl: string | null;
//   subscribersAmount: number;
//   firstName: string;
//   lastName: string;
//   isActive: boolean;
//   stack: string[];
//   city: string;
//   description: string;
//
//   constructor(
//     id: number,
//     username: string,
//     avatarUrl: string | null,
//     subscribersAmount: number,
//     firstName: string,
//     lastName: string,
//     isActive: boolean,
//     stack: string[],
//     city: string,
//     description: string,
//   ) {
//     this.id = id;
//     this.username = username;
//     this.avatarUrl = avatarUrl;
//     this.subscribersAmount = subscribersAmount;
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.isActive = isActive;
//     this.stack = stack;
//     this.city = city;
//     this.description = description;
//   }
// }
