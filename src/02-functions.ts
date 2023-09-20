import {Friend, Colleague, EmailContact } from './myTypes'
import { friends, colleagues } from "./01-basics";

function older(f: Friend) {
     f.age += 1
     return `${f.name} is now ${f.age}` 
}

console.log(older(friends[0]))

function allOlder(friends: Friend[]) {
   return friends.map(older)
}

console.log(allOlder(friends))

// Find the colleague with the highest extension number.
function highestExtension(cs: Colleague[]) {
    const result = cs.sort(
      (c1, c2) => c1.contact.extension - c2.contact.extension
    );
    return result[cs.length - 1];
  }
  console.log(highestExtension(colleagues.current));

  //Add a new colleague to the current colleague array and sets extension number to the highest extension plus 1.
function addColleague(  cs: Colleague[], name: string, department: string, email: string) {
    const newColleague: Colleague = {
      name: name,
      department: department,
      contact: {
        email: email,
        extension: highestExtension(cs).contact.extension + 1,
      },
    };
    cs.push(newColleague);
  }

  addColleague(colleagues.current, "Sheild O Connell", "HR", "soc@here.com");
console.log(colleagues.current.filter((c) => c.name === "Sheild O Connell"));

function sortColleagues(
  Colleagues: Colleague[],
  sorter: (c1: Colleague, c2: Colleague) => number,
  max? : number
): EmailContact[] {
  let end = Colleagues.length;
  if (max !== undefined) {
   end = max < 2 ? 1 : max
  }
  const sorted = Colleagues.sort(sorter); //Colleague inferred
  const fullResult =  sorted.map((ce) => ({ name: ce.name, email: ce.contact.email }));
  return fullResult.slice(0, end);
}

// Test invocations
console.log(sortColleagues(colleagues.current, (a, b) => (a.contact.extension - b.contact.extension),3));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length),1));
console.log(sortColleagues(colleagues.current, (a, b) => (a.name.length - b.name.length))); // NEW

//a function called ‘findFriends’ that searches an array of friends for those that satisfy a criterion
function findFriends(
  friends: Friend[],
  sorter: (f: Friend) => boolean
) {
  const sorted = friends.filter(sorter);
  const result = sorted.map((f) => ({ name: f.name}));
  return result;
}


console.log(findFriends(friends, (friend) => friend.name.startsWith('Pa')));
console.log(findFriends(friends, (friend) => friend.age < 35));

//a function called addInterest that adds an interest to a friend’s array of interests and returns the updated interests array (of strings)

function addInterest(f: Friend, interest: string) {
  if (f.interests === undefined) {
    f.interests = [];
  }
  f.interests.push(interest);
  return f.interests;
}

console.log(addInterest(friends[1], 'Politics'))

