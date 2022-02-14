function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedBook = books.filter((book) => book.borrows.some((borrow) => !borrow.returned));
  let returnedBook = books.filter((book) => book.borrows.every((item) => item.returned)); 
  return [borrowedBook, returnedBook];
}

function getBorrowersForBook(book, accounts) {
  return accounts.filter((account) => {
         let borrowedBook = book.borrows.find((borrowed) => 
             borrowed.id === account.id);
                 if (borrowedBook === undefined){
                   return false;
                 }
                 account.returned = borrowedBook.returned;
                    
                 return true;
  });
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
