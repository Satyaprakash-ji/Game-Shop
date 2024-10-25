import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "PC Games",
    img: "https://images.unsplash.com/photo-1596697939537-bf55495f7630?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHBjJTIwZ2FtZXxlbnwwfDF8MHx8fDA%3D",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
    totalItems: "49",
  },
  {
    _id: uuid(),
    categoryName: "Xbox Games",
    img: "https://images.unsplash.com/photo-1518719028738-e7262020a932?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGMlMjBnYW1lfGVufDB8MXwwfHx8MA%3D%3D",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
    totalItems: "7",
  },
  {
    _id: uuid(),
    categoryName: "PS Games",
    img: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBsYXklMjBzdGF0aW9uJTIwNXxlbnwwfDF8MHx8fDA%3D",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    totalItems: "9",
  },
  {
    _id: uuid(),
    categoryName: "Gaming Components",
    img: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
    totalItems: "2",
  },
];
